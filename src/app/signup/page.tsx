
"use client";

import { Container } from "@chakra-ui/react";
import { signupSteps } from '@/utils'
import FormSignUpWizard from "@/app/_components/forms/signup/FormSignUpWizard";
import { useGlobalStore } from "@/provider/GlobalStoreProvider";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useRouter } from "nextjs-toploader/app";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const params = useSearchParams()
  const { info } = useGlobalStore(
    (state: any) => state,
  )
  const defaultValues = { ...info };
  const handleSubmit = (values: Record<string, any>) => {
    setIsLoading(true)
    router.push(`/verify${params.get('product') ? `?product=${params.get('product')}` : ''}`);
  };

  return (
    <Suspense>
      <Container maxW='8xl' display={'flex'} justifyContent={'center'}>
        <FormSignUpWizard
          steps={signupSteps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Container>
    </Suspense>
  );
}
