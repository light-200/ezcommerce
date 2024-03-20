import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function Button({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  props?: ComponentPropsWithoutRef<"button">;
}) {
  return (
    <button
      type="submit"
      className={cn(
        "rounded-md bg-black py-3 text-center text-sm font-semibold uppercase text-white",
        className,
      )}
    >
      {children}
    </button>
  );
}
