import { useState } from "react";
import { validateRequest } from "~/lib/auth/validate-request";
import { redirect, useSearchParams } from "next/navigation";
import Verify from "~/app/_components/verification";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) redirect("/");

  return (
    <section className="grid place-content-center pt-6">{<Verify />}</section>
  );
}
