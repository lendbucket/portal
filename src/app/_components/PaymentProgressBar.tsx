"use client";
import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import moment from 'moment';

const CircleIcon = (props: any) => (
  <Icon viewBox='0 0 200 200' {...props}>
    <path
      fill='currentColor'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  </Icon>
)

export const PaymentProgressBar = ({ tracks }: { tracks: any }) => {

  const months = moment.monthsShort()
  const currentYear = moment().year()

  const matchingTrack = (month: string) => {
    const index = tracks?.findIndex((track: any) => track.month === month)
    if (index === -1) {
      return 'gray.300'
    } else if (tracks[index] && tracks[index].status) {
      return 'lime.500'
    } if (tracks[index] && !tracks[index].status) {
      return 'red.500'
    } else {
      return 'gray.300'
    }
  }

  return (
    <Stack spacing={5} bg={'white'}>
      <Text fontSize={'0.75rem'}>Payment Progress</Text>

      <HStack w={'full'} justifyContent={'space-between'}>
        {months?.map((month: string, index: number) => {
          return (
            <Stack key={index} spacing={0} alignItems={'center'}>
              <CircleIcon boxSize={3} color={matchingTrack(month)} />
              <Text fontSize={'0.5rem'} color={`gray.500`}>{month}</Text>
            </Stack>
          )
        })}
      </HStack>
      <Text fontSize={'0.75rem'} color={'brand.600'} textAlign={'center'}>{currentYear}</Text>
    </Stack>
  );
};

export default PaymentProgressBar