import "@/styles/globals.css";
import { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import SessionProvider from "@/provider/SessionProvider";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { Header } from "@/app/_components/header";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const session = await getServerAuthSession();
  if (!session) {
    redirect("/signin");
  }

  return (
    <SessionProvider session={session}>
      <HydrateClient>
        <Suspense>
          <Header />
          <Box mx='auto' px={{ base: '20px', md: '30px' }} pt='60px' minH='100vh'>
            {children}
          </Box>
        </Suspense>
      </HydrateClient>
    </SessionProvider>
  );
}
