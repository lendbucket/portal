"use client";

import { SessionProvider as _SessionProvider } from "next-auth/react";

export default function SessionProvider({
  session,
  children
}: {
  session: any,
  children: any
}) {
  return <_SessionProvider session={session}>{children}</_SessionProvider>;
}