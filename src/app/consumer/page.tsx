import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Consumer() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/signin");
  } else {
    redirect("/consumer/home");
  }
}