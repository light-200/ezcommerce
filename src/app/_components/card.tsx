import { ReactNode } from "react";

export default function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-[500px] flex-col items-center gap-4 rounded-xl border border-gray-300 p-8 px-12">
      <h1 className="text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
}
