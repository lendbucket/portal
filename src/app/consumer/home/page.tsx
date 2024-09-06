"use client";
import { Box, Button, Container, Flex, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Icon, Stack, Switch, Text, VStack } from "@chakra-ui/react";
import lang from '@/snippet/en.json'
import { FaHandHoldingUsd } from "react-icons/fa";
import Card from "@/app/_components/card/Card";
import { useState } from "react";
import { useRouter } from 'nextjs-toploader/app';
import CreditBuilderLoanCard from "@/app/_components/products/CreditBuilderLoanCard";
import FicoScore8Indicator from "@/app/_components/common/FicoScore8Indicator";
import FicoScore8HistoryChart from "@/app/_components/common/FicoScore8HistoryChart";
import RevolvingCreditLoanCard from "@/app/_components/products/RevolvingCreditLoanCard";

const products = [
  {
    id: '1234',
    type: "cbl",
    name: "MAGNUM",
    autoPay: true,
    nextPayment: 30,
    progress: 0,
    tracks: [
      { month: 'Jan', status: true },
      { month: 'Feb', status: true },
      { month: 'Mar', status: true },
      { month: 'Apr', status: false },
      { month: 'May', status: true },
    ],
    inProgress: false,
    dueDate: '2024-09-12',
    createdAt: '2024-09-12',
  },
  {
    id: '1234',
    type: "revolv",
    name: "Revolv",
    autoPay: false,
    nextPayment: 50,
    progress: 10,
    tracks: [
      { month: 'Jan', status: true },
      { month: 'Feb', status: true },
      { month: 'Mar', status: true },
      { month: 'Apr', status: false },
      { month: 'May', status: true },
    ],
    inProgress: false,
    dueDate: '2024-09-23',
    createdAt: '2024-09-12',
  },
  {
    id: '1234',
    type: "cbl",
    name: "MAGNUM",
    autoPay: false,
    nextPayment: 50,
    progress: 10,
    tracks: [
      { month: 'Jan', status: true },
      { month: 'Feb', status: true },
      { month: 'Mar', status: true },
      { month: 'Apr', status: false },
      { month: 'May', status: true },
    ],
    inProgress: true,
    dueDate: '2024-09-23',
    createdAt: '2024-09-12',
  },
  {
    id: '1234',
    type: "revolv",
    name: "Revolv",
    autoPay: false,
    nextPayment: 50,
    progress: 10,
    tracks: [
      { month: 'Jan', status: true },
      { month: 'Feb', status: true },
      { month: 'Mar', status: true },
      { month: 'Apr', status: false },
      { month: 'May', status: true },
    ],
    inProgress: true,
    dueDate: '2024-09-23',
    createdAt: '2024-09-12',
  },
]
export default function ConsumerHome() {

  const router = useRouter();
  const [isBusiness, setIsBusiness] = useState(false)
  const handlePortalPlace = (e: any) => {
    setIsBusiness(!isBusiness)
    if (e.target.checked) {
      router.push('/business/home');
    }
  }

  return (
    <Box className="w-full" >
      <Container maxW='7xl' px={0}>
        <Flex py={5}>
          <FormControl as={Flex} justifyContent={'end'} alignItems={'center'} gap={3}>
            <FormLabel htmlFor='isChecked' m={0}>{lang.portal.base.consumer}</FormLabel>
            <Switch id='isChecked' colorScheme={'lime'} isChecked={isBusiness} onChange={handlePortalPlace} />
            <FormLabel htmlFor='isChecked' m={0}>{lang.portal.base.business}</FormLabel>
          </FormControl>
        </Flex>
        <HStack spacing={5} py={5}>
          <Grid
            w={'full'}
            templateRows={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={5}
          >
            <GridItem w='100%' h='100%' colSpan={1}>
              <VStack spacing={5} w='100%' >
                <Card maxW='sm' p={0} bg={'secGray.50'} w='100%' >
                  <VStack py={3} px={8} borderTopRadius={'10px'}>
                    <Heading size={'md'} color={`lime.500`}>{lang.portal.dashboard.welcome.title}</Heading>
                    <Text fontSize={'12px'} textAlign={'center'}>{lang.portal.dashboard.welcome.description}</Text>
                  </VStack>
                </Card>

                <Card maxW='sm' p={0} borderColor={'amber.400'} w='100%'>
                  <Box h={'48px'} bg={'amber.400'} borderTopRadius={'10px'}></Box>
                  <VStack bg={'amber.50'}>
                    <Icon fontSize={'5xl'} as={FaHandHoldingUsd} color={`amber.400`} p={2} mt={"-24px"} border={'2px'} borderColor={'amber.400'} borderRadius={'50%'} bg={'amber.50'} />
                  </VStack>
                  <VStack py={3} px={8} borderBottomRadius={'10px'} bg={'amber.50'}>
                    <Heading size={'md'} color={`amber.400`}>{lang.portal.dashboard.product.title}</Heading>
                    <Text fontSize={'14px'}>{lang.portal.dashboard.product.description}</Text>
                    <Stack spacing={3} my={4}>
                      <Button as={'a'} py={1} px={10} h={'100%'} borderRadius={'50px'} colorScheme="orange" href={`/products/revolv`}>
                        <Stack spacing={1} alignItems={'center'}>
                          <Text fontSize={'0.875rem'}>Revolv</Text>
                          <Text fontSize={'0.65rem'}>Build revolving credit</Text>
                        </Stack>
                      </Button>
                      <Button as={'a'} py={1} px={10} h={'100%'} borderRadius={'50px'} colorScheme="lime" href={`/products/revolv`}>
                        <Stack spacing={1} alignItems={'center'}>
                          <Text fontSize={'0.875rem'}>MAGNUM</Text>
                          <Text fontSize={'0.65rem'}>Build magnum credit</Text>
                        </Stack>
                      </Button>
                      <Button as={'a'} py={1} px={10} h={'100%'} borderRadius={'50px'} colorScheme="brand" href={`/products/revolv`}>
                        <Stack spacing={1} alignItems={'center'}>
                          <Text fontSize={'0.875rem'}>CS Business</Text>
                          <Text fontSize={'0.65rem'}>Build business credit</Text>
                        </Stack>
                      </Button>
                    </Stack>
                  </VStack>
                </Card>
              </VStack>
            </GridItem>
            <GridItem w='100%' h='100%' colSpan={{ base: 1, md: 3 }}>
              <VStack spacing={5}>
                <Grid
                  w={'full'}
                  templateRows={`repeat(1, 1fr)`}
                  templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
                  gap={5}
                >
                  <GridItem colSpan={1} w={'full'} h='100%'>
                    <FicoScore8Indicator />
                  </GridItem>
                  <GridItem colSpan={{ base: 1, md: 2 }} w={'full'} h='100%'>
                    <FicoScore8HistoryChart />
                  </GridItem>
                </Grid>
                <Grid
                  w={'full'}
                  templateRows={`repeat(1, 1fr)`}
                  templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
                  gap={5}
                >
                  {products?.map((product: any, index: number) => {
                    if (product.type === 'cbl') {
                      return (
                        <GridItem key={index} maxW={{ base: 'full', md: '420px', xl: '336px' }} w={'full'} h='100%'>
                          <CreditBuilderLoanCard data={product} />
                        </GridItem>
                      )
                    } else if (product.type === 'revolv') {
                      return (
                        <GridItem key={index} maxW={{ base: 'full', md: '420px', xl: '336px' }} w={'full'} h='100%'>
                          <RevolvingCreditLoanCard data={product} />
                        </GridItem>
                      )
                    }
                  })}
                </Grid>
              </VStack>
            </GridItem>
          </Grid>
        </HStack>

      </Container>
    </Box>
  );
}