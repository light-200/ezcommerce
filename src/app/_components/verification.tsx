"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Card from "./ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useState } from "react";
import Button from "./ui/button";

export default function Verify() {
  const [value, setValue] = useState("");
  const email = "swa***@gmail.com";
  return (
    <Card title="Verify your email">
      <p className="mb-4 w-72 text-center text-sm">
        Enter the 8 digit code you have received on {email}
      </p>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="otp" className="text-sm font-semibold">
            Code
          </label>
          <InputOTP
            id="otp"
            maxLength={8}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button>verify</Button>
      </form>
    </Card>
  );
}
