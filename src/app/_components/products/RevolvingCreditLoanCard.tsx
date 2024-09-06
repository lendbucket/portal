"use client";
import NextLink from 'next/link'
import { Box, Button, Flex, HStack, Icon, Link, Stack, StackDivider, Tag, TagLabel, Text } from '@chakra-ui/react'
import { FiAlertTriangle, FiArrowRightCircle, FiInfo } from "react-icons/fi";
import CircleIcon from '../common/CircleIcon';
import { useState } from 'react';
import ReactStars from 'react-stars'
import { formatFullDate } from '@/utils';

export const RevolvingCreditLoanCard = ({ data }: { data: CreditBuilderLoanProps }) => {
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
    // other logic
  }

  return (
    <>
      {
        data.inProgress ? (
          <Stack spacing={5} borderRadius={'10px'} bg={'white'} px={5} pb={5} boxShadow={'0 1px 8px #4444441f'} h={'500px'}>
            <Box mx={-5} h={'10px'} borderTopRadius={'10px'} bg={'lime.500'}></Box>
            <Stack spacing={1} alignItems={'center'} justifyContent={'center'} h={'full'}>
              <Stack spacing={1} alignItems={'center'}>
                <Text fontSize={'1rem'} textAlign={'center'}>Revolving Line Of Credit Application created on:</Text>
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
            <Stack alignItems={'center'} spacing={4}>
              <Text fontWeight={600} fontSize={'1.25rem'} my={4}>No Payment Due</Text>
              <HStack alignItems={'start'}>
                <Icon as={FiAlertTriangle} color={`yellow.500`} />
                <Text fontSize={'0.75rem'}>No monthly payment set. For optimal utilization, set payment between <strong>$60.00</strong> and <strong>$90.00</strong></Text>
              </HStack>
            </Stack>
            <Stack spacing={1}>
              <HStack py={2} alignItems={'start'} justifyContent={'space-between'} divider={<StackDivider borderColor={'gray.300'} />} borderWidth={'1px 0px'} borderColor={'gray.300'}>
                <Stack alignItems={'center'} w={'full'}>
                  <HStack>
                    <CircleIcon boxSize={3} color={'lime.500'} />
                    <Text fontSize={'0.75rem'}>Credit Limit</Text>
                  </HStack>
                  <Text fontSize={'1rem'} fontWeight={600}>$1000</Text>
                </Stack>
                <Stack alignItems={'center'} w={'full'}>
                  <HStack>
                    <CircleIcon boxSize={3} color={'brand.500'} />
                    <Text fontSize={'0.75rem'}>Savings Balance</Text>
                  </HStack>
                  <Text fontSize={'1rem'} fontWeight={600}>$0</Text>
                </Stack>
              </HStack>
              <HStack alignItems={'center'}>
                <Text fontSize={'0.75rem'}>Next Boost</Text>
                <Icon as={FiInfo} color={`brand.500`} />
                <Flex>
                  <ReactStars
                    count={3}
                    size={24}
                    color2={'#ffd700'} />
                </Flex>
              </HStack>
            </Stack>

            <Button as={'a'} href={'#'} colorScheme='brand' mx={10} size={'sm'} borderRadius={'full'}>Make a Payment</Button>
            <Link as={NextLink} href={'#'} fontSize={'0.75rem'} color={'brand.500'} textAlign={'center'}>
              Account Details
            </Link>
          </Stack>
        )
      }
    </>
  );
};

export default RevolvingCreditLoanCard