
"use client";

import { Suspense, useEffect, useState } from "react";
import { Button, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { api } from "@/trpc/react";
import { useGlobalStore } from "@/provider/GlobalStoreProvider";
import { useSearchParams } from 'next/navigation'
import lang from '@/snippet/en.json'
import Card from "@/app/_components/card/Card";
import VerifyLink from "@/app/_components/plaid/VerifyLink";

export default function Page() {
  const [status, setStatus] = useState('init')
  const params = useSearchParams()
  const { info, setLinkToken, setHostedLinkURL, setVerifyStatus } = useGlobalStore(
    (state: any) => state,
  )

  const generateLinkTokenForIdv = api.plaid.generateLinkTokenForIdv.useMutation({
    onSuccess: async (res: any) => {
      setLinkToken(res.link_token)
      setHostedLinkURL(res.hosted_link_url)
    },
  });

  const handleVerifyAction = (event: any) => {
    console.log("event", event)
    setVerifyStatus({
      is_verified: false,
      idv_status: event.IDVData.status,
      most_recent_idv_session: event.sessionId,
    })
    setStatus(event.IDVData.status)
  }

  const generateButtonElement = () => {
    switch (status) {
      case 'init':
        return (
          <VerifyLink
            label="Start Verification"
            isDisabled={generateLinkTokenForIdv.isPending}
            isLoading={generateLinkTokenForIdv.isPending}
            onAction={handleVerifyAction}
          />
        )
      case 'failed':
        return <Button as={'a'} w={'full'} colorScheme="red" href={`/signup`}>Back</Button>

      case 'success':
        return <Button as={'a'} w={'full'} colorScheme="lime" href={`/payment${params.get('product') ? `?product=${params.get('product')}` : ''}`}>Next</Button>

      default:
        return (
          <VerifyLink
            label="Start Verification"
            isDisabled={generateLinkTokenForIdv.isPending}
            isLoading={generateLinkTokenForIdv.isPending}
            onAction={handleVerifyAction}
          />
        )
    }
  }

  useEffect(() => {
    if (!info || !info.id || !info.email) {
      return
    }
    console.log("Verify")
    generateLinkTokenForIdv.mutate({ userId: info.id, email: info.email })
  }, [info])

  return (
    <Suspense>
      <Container maxW='8xl' display={'flex'} justifyContent={'center'}>
        <Card maxW='lg' py={16} px={10} h={'full'}>
          <VStack mb={6} alignItems={'start'}>
            <Heading as={'h2'} fontSize={'1.75rem'}>{lang.portal.identity.step1.title}</Heading>
            <Text color={'gray.600'}>{lang.portal.identity.step1.description}</Text>
          </VStack>
          <Flex w={'full'} mt={6} justifyContent={'space-between'} gap={4}>
            {generateButtonElement()}
          </Flex>
        </Card>
      </Container>
    </Suspense>
  );
}
