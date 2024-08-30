import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Business() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/signin");
  } else {
    redirect("/business/home");
  }
}