"use client";
import { SyntheticEvent, useState } from "react";
import Card from "./ui/card";
import Link from "next/link";
import Button from "./ui/button";

export default function SignupForm({
  handleStage,
}: {
  handleStage: (i: 1 | 2) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    handleStage(2);
  };
  return (
    <Card title="Create your account">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter"
            className="rounded-md border border-gray-200 p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter"
            className="rounded-md border border-gray-200 p-2"
          />
        </div>
        <div className="mb-4 flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter"
            className="rounded-md border border-gray-200 p-2"
          />
        </div>
        <Button>create account</Button>
        <p className="my-4 w-full text-center text-sm">
          Have an account?{" "}
          <span>
            <Link href={"/login"} className="font-semibold">
              Login
            </Link>
          </span>
        </p>
      </form>
    </Card>
  );
}
