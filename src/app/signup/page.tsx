import { useState } from "react";
import SignupForm from "../_components/signupForm";
import Verify from "../_components/verification";
import { validateRequest } from "~/lib/auth/validate-request";
import { redirect, useSearchParams } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) redirect("/");

  return (
    <section className="grid place-content-center pt-6">
      {<SignupForm />}
    </section>
  );
}
