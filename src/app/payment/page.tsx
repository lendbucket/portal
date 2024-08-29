
"use client";

import { Suspense, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { api } from "@/trpc/react";
import { useGlobalStore } from "@/provider/GlobalStoreProvider";
import lang from '@/snippet/en.json'
import Card from "@/app/_components/card/Card";
import TransferLink from "@/app/_components/plaid/TransferLink";
import { generateBill, MEMBERSHIP_FEE } from "../../utils/plaid";

export default function Page() {
  const toast = useToast()
  const [value, setValue] = useState('checking');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { info, plaid, bill, verifyStatus, setLinkToken, setHostedLinkURL, setTransferIntentId, setPaymentType, setBill, resetStore } = useGlobalStore(
    (state: any) => state,
  )
  const legalName = `${info.firstname} ${info.lastname}`;
  const transferRecurringCreate = api.plaid.transferRecurringCreate.useMutation();
  const registerUser = api.user.create.useMutation();

  const generateLinkTokenForTransfer = api.plaid.generateLinkTokenForTransfer.useMutation({
    onSuccess: async (res: any) => {
      setLinkToken(res.link_token)
      setHostedLinkURL(res.hosted_link_url)
      setTransferIntentId(res.transferIntentId)
    },
  });

  const handleTransfer = async (data: any) => {
    const result = await transferRecurringCreate.mutateAsync({
      legalName,
      accountId: data.accountId,
      accessToken: data.accessToken,
      amount: MEMBERSHIP_FEE,
      description: "RecurringM" // Max 15 characters 
    })
    if (result) {
      console.log("recurring: ", result)
      const signupValue = {
        ...info,
        plaid: { ...plaid },
        bill: { ...bill },
        country: "US",
        verifyStatus: { ...verifyStatus }
      }

      await registerUser.mutateAsync({ ...signupValue });
      onOpen()
      resetStore()
    } else {
      toast({
        title: `Something went wrong.`,
        variant: 'left-accent',
        position: 'top-right',
        status: 'error',
        isClosable: true,
      })
    }

  }

  const handlePaymentType = (e: any) => {
    setValue(e)
    setPaymentType(e)
  }

  useEffect(() => {
    setPaymentType('checking')
    if (!info.id || !info.firstname || !info.lastname) {
      return
    }
    const billDescription = "Monthly Membership Charge"
    const bill = generateBill(info.id, MEMBERSHIP_FEE, billDescription)
    setBill(bill)

    generateLinkTokenForTransfer.mutateAsync({
      userId: info.id,
      legalName: legalName,
      accountId: null,
      billId: bill?.id,
      amount: MEMBERSHIP_FEE,
      accessToken: '',
      description: "Membership Fee"
    })
  }, [info])

  return (
    <>
      <Suspense>
        <Container maxW='8xl' display={'flex'} justifyContent={'center'}>
          <Card maxW='lg' py={16} px={10} h={'full'}>
            <VStack mb={6} alignItems={'start'}>
              <Heading as={'h2'} fontSize={'1.75rem'}>{lang.portal.payment.title}</Heading>
              <Text color={'gray.600'}>{lang.portal.payment.description}</Text>
            </VStack>
            <Flex w={'full'} mt={6} justifyContent={'space-between'} gap={4}>
              <RadioGroup onChange={(e) => handlePaymentType(e)} value={value}>
                <Stack spacing={5}>
                  <Box borderWidth={value === 'checking' ? '2px' : '1px'} borderRadius="md" p={4} borderColor={value === 'checking' ? 'lime.500' : 'gray.200'}>
                    <Radio value="checking" colorScheme={'lime'}>
                      <Text fontWeight="bold">{lang.portal.payment.checking.title}</Text>
                      <Text fontSize="sm" color="gray.600" mb={3}>
                        {lang.portal.payment.checking.description}
                      </Text>
                      {value === 'checking' && (
                        <TransferLink
                          label={lang.portal.payment.checking.button}
                          isDisabled={generateLinkTokenForTransfer.isPending}
                          isLoading={transferRecurringCreate.isPending || registerUser.isPending}
                          onAction={handleTransfer} />
                      )}
                    </Radio>
                  </Box>
                  <Box borderWidth={value === 'debit' ? '2px' : '1px'} borderRadius="md" p={4} borderColor={value === 'debit' ? 'lime.500' : 'gray.200'}>
                    <Radio value="debit" colorScheme={'lime'}>
                      <Text fontWeight="bold">{lang.portal.payment.card.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {lang.portal.payment.card.description}
                      </Text>
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </Flex>
          </Card>
        </Container>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} size={'3xl'} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Alert
                status='success'
                colorScheme='lime'
                bg={'transparent'}
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='400px'
              >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                  Success!
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                  Thanks for register your account.
                </AlertDescription>
              </Alert>
            </ModalBody>

            <ModalFooter>
              <Flex w={'full'} justifyContent={'center'}>
                <Button as={'a'} colorScheme='lime' px={24} href="/signin">
                  Sign In
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Suspense>
    </>
  );
}
