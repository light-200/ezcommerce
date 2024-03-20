"use client";
import { type ReactNode, createContext, useContext } from "react";
import type { validateRequest } from "~/lib/auth/validate-request";

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

const SessionContext = createContext<ContextType>({
  session: null,
  user: null,
});
export const useSession = () => useContext(SessionContext);

export const SessionProivder = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ContextType;
}) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
