"use server";

/* eslint @typescript-eslint/no-explicit-any:0, @typescript-eslint/prefer-optional-chain:0 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";
import { isWithinExpirationDate, TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import {
  LoginInput,
  loginSchema,
  SignupInput,
  signupSchema,
} from "../validators/auth";
import { db } from "~/server/db";
import { lucia } from "~/auth";
import { sendMail } from "~/server/send-mail";
import { renderVerificationCodeEmail } from "../email-templates/email-verification";
import { validateRequest } from "./validate-request";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function login(
  _: any,
  formData: FormData,
): Promise<ActionResponse<LoginInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return {
      formError: "Incorrect email or password",
    };
  }

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password,
  );
  if (!validPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function signup(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
        name: err.fieldErrors.name?.[0],
      },
    };
  }

  const { email, password, name } = parsed.data;

  const existingUser = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return {
      formError: "Cannot create account with that email",
    };
  }

  const userId = generateId(21);
  const hashedPassword = await new Scrypt().hash(password);
  await db.user.create({
    data: {
      email,
      hashedPassword,
      id: userId,
      name,
    },
  });

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendMail({
    to: email,
    subject: "Verify your account",
    body: renderVerificationCodeEmail({ code: verificationCode }),
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/signup/verify");
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "No session found",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function resendVerificationEmail(): Promise<{
  error?: string;
  success?: boolean;
}> {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const lastSent = await db.emailVerificationCodes.findFirst({
    where: { user_id: user.id },
    select: { expires_at: true },
  });

  if (lastSent && isWithinExpirationDate(lastSent.expires_at)) {
    return {
      error: `Please wait ${timeFromNow(lastSent.expires_at)} before resending`,
    };
  }
  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email,
  );
  await sendMail({
    to: user.email,
    subject: "Verify your account",
    body: renderVerificationCodeEmail({ code: verificationCode }),
  });

  return { success: true };
}

export async function verifyEmail(
  _: any,
  formData: FormData,
): Promise<{ error: string } | void> {
  const code = formData.get("code");
  if (typeof code !== "string" || code.length !== 8) {
    return { error: "Invalid code" };
  }
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const item = await db.emailVerificationCodes.findFirst({
    where: { user_id: user.id },
  });
  if (item) {
    await db.emailVerificationCodes.delete({ where: { id: item.id } });
  }

  const dbCode = item;

  if (!dbCode || dbCode.code !== code)
    return { error: "Invalid verification code" };

  if (!isWithinExpirationDate(dbCode.expires_at))
    return { error: "Verification code expired" };

  if (dbCode.email !== user.email) return { error: "Email does not match" };

  await lucia.invalidateUserSessions(user.id);
  await db.user.update({
    data: {
      emailVerified: true,
    },
    where: {
      id: user.id,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect("/");
}

const timeFromNow = (time: Date) => {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
};

async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db.emailVerificationCodes.delete({ where: { user_id: userId } });
  const code = generateRandomString(8, alphabet("0-9")); // 8 digit code
  await db.emailVerificationCodes.create({
    data: {
      user_id: userId,
      email,
      code,
      expires_at: createDate(new TimeSpan(10, "m")), // 10 minutes
    },
  });
  return code;
}
