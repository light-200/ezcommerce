"use client";
import { useState } from "react";
import SignupForm from "../_components/signupForm";
import Verify from "../_components/verification";

export default function Page() {
  const [stage, setStage] = useState<1 | 2>(1);

  return (
    <section className="grid place-content-center pt-6">
      {stage == 1 ? <SignupForm handleStage={setStage} /> : <Verify />}
    </section>
  );
}
