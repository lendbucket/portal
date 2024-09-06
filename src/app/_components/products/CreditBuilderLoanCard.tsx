"use client";
import NextLink from 'next/link'
import { Box, Button, Flex, HStack, Icon, Link, Stack, StackDivider, Tag, TagLabel, Text } from '@chakra-ui/react'
import { FiArrowRightCircle } from "react-icons/fi";
import { formatDate, formatFullDate } from '@/utils';
import PaymentProgressBar from '../PaymentProgressBar';

export const CreditBuilderLoanCard = ({ data }: { data: CreditBuilderLoanProps }) => {

  return (
    <>
      {data.inProgress ? (
        <Stack spacing={5} borderRadius={'10px'} bg={'white'} px={5} pb={5} boxShadow={'0 1px 8px #4444441f'} h={'500px'}>
          <Box mx={-5} h={'10px'} borderTopRadius={'10px'} bg={'lime.500'}></Box>
          <Stack spacing={1} alignItems={'center'} justifyContent={'center'} h={'full'}>
            <Stack spacing={1} alignItems={'center'}>
              <Text fontSize={'1rem'} textAlign={'center'}>Credit Builder Loan Application created on:</Text>
              <Text fontWeight={600} fontSize={'1.25rem'}>{formatFullDate(data.createdAt)}</Text>
            </Stack>
            <Button as={'a'} href={'#'} mt={5} colorScheme='orange' mx={10} size={'sm'} borderRadius={'full'}>Continue Application</Button>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={5} borderRadius={'10px'} bg={'white'} px={5} pb={5} boxShadow={'0 1px 8px #4444441f'} h={'500px'}>
          <Box mx={-5} h={'10px'} borderTopRadius={'10px'} bg={'lime.500'}></Box>

          <HStack w={'full'} justifyContent={'space-between'}>
            <Stack spacing={0}>
              <Text fontWeight={600} fontSize={'1.25rem'}>{data?.name}</Text>
              <Text fontSize={'0.75rem'} color={`brand.600`}>Credit Builder Loan</Text>
            </Stack>
            <Link as={NextLink} href={'#'}>
              <Icon as={FiArrowRightCircle} color={`brand.600`} fontSize={'1.5rem'} />
            </Link>
          </HStack>
          <HStack justifyContent={'center'}>
            <Tag size={'sm'} variant='outline' colorScheme={data.autoPay ? 'lime' : 'red'} borderRadius={'full'}>
              <TagLabel color={'gray.600'} me={2}>AutoPay is</TagLabel>
              <TagLabel>{data.autoPay ? 'On' : 'Off'}</TagLabel>
            </Tag>
          </HStack>

          <HStack alignItems={'start'} justifyContent={'space-between'} divider={<StackDivider borderColor={'gray.300'} />}>
            <Stack alignItems={'center'} w={'full'}>
              <Text fontSize={'0.75rem'}>Next payment</Text>
              <Text fontSize={'1.75rem'} fontWeight={600}>$30</Text>
              <Flex>
                <Text fontSize={'0.75rem'} me={2}>Due On</Text>
                <Tag size={'sm'} variant='outline' colorScheme='lime' borderRadius={'full'}>
                  <TagLabel color={'lime.600'}>{formatDate(data.dueDate)}</TagLabel>
                </Tag>
              </Flex>
            </Stack>
            <Stack alignItems={'center'} w={'full'}>
              <Text fontSize={'0.75rem'}>Progress</Text>
              <Text fontSize={'1.75rem'} fontWeight={600}>0</Text>
              <Text fontSize={'0.75rem'} textAlign={'center'}>On-Time Payment Reported</Text>
            </Stack>
          </HStack>

          <Button as={'a'} href={'#'} colorScheme='brand' mx={10} size={'sm'} borderRadius={'full'}>Make a Payment</Button>
          <Link as={NextLink} href={'#'} fontSize={'0.75rem'} color={'brand.500'} textAlign={'center'}>
            Change Monthly Payment
          </Link>
          <StackDivider borderBottomWidth={1} borderColor={'gray.300'} />
          <PaymentProgressBar tracks={data.tracks} />
        </Stack>
      )}
    </>
  );
};

export default CreditBuilderLoanCard