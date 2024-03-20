"use client";
import { SyntheticEvent, useState } from "react";
import Card from "./ui/card";
import Link from "next/link";
import Button from "./ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
  };
  return (
    <Card title="Login">
      <div className="gap-2 text-center">
        <h2 className="font-semibold">Welcome back to Ezcommerce</h2>
        <p className="text-sm">The next gen business marketplace.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button>Login</Button>
        <p className="my-4 w-full text-center text-sm">
          Don't have an account?{" "}
          <span>
            <Link href={"/signup"} className="font-semibold">
              Sign Up
            </Link>
          </span>
        </p>
      </form>
    </Card>
  );
}
