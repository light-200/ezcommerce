import React, { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-md bg-black py-3 text-center text-sm font-semibold uppercase text-white"
    >
      {children}
    </button>
  );
}
