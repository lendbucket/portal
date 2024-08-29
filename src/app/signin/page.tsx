
import FormSignIn from "@/app/_components/forms/signin/FormSignIn";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <FormSignIn />
    </Suspense>
  );
}
