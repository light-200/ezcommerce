import { validateRequest } from "~/lib/auth/validate-request";
import LoginForm from "../_components/loginForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) redirect("/");
  return (
    <section className="grid place-content-center pt-6">
      <LoginForm />;
    </section>
  );
}
