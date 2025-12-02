"use client";

import { createContext, useContext } from "react";
import { Session } from "next-auth";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useProtectedSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useProtectedSession must be used within SessionProvider");
  }
  return session;
}
