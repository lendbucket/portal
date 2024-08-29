"use client";
import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import Card from './Card';
import baseLang from '@/snippet/en.json'

export const ProductPriceCard = ({
  path,
  lang,
  variant,
  monthly = false
}: {
  path: string
  lang: any
  variant?: string
  monthly?: boolean
}) => {

  return (
    <Card maxW='md' p={0} h={'full'} flexGrow={2} bg={'transparent'}>
      <VStack py={3} borderTopRadius={'10px'}>
        <Heading fontSize={'1.5rem'}>{lang.name}</Heading>
      </VStack>
      <VStack px={5} pb={5} spacing={0} minH={'148px'}>
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'} gap={1}>
          <Text fontSize={'2.25rem'}>$</Text>
          <Text fontSize={'3rem'} fontWeight={600}>{lang.price}</Text>
          {lang.second_price && (
            <>
              <Text fontSize={'2rem'} px={2}>or</Text>
              <Text fontSize={'2.25rem'}>$</Text>
              <Text fontSize={'3rem'} fontWeight={600}>{lang.second_price}</Text>
            </>
          )}
          <Text fontSize={'2rem'} ps={2}>Today</Text>
        </Flex>
        {lang.monthly_range && (
          <Flex>
            <Text fontSize={'1.25rem'}>{lang.monthly_range}</Text>
          </Flex>
        )}
        <Text fontSize={'0.875rem'} color={'gray.400'}>{monthly ? baseLang.portal.base.monthly_requied : baseLang.portal.base.monthly_optional}</Text>
      </VStack>
      <VStack w={'full'} h={'full'} bg={'secGray.50'} justifyContent={'space-between'} pt={10} pb={8} px={10} gap={8} borderBottomRadius={'10px'}>
        <Box h={'full'} textAlign={'center'}>
          <Text as={'span'} color={`${variant}.500`} pe={1}>{lang.price_des_head}</Text><Text as={'span'}>{lang.price_des}</Text>
        </Box>
        <VStack w={'full'} spacing={5}>
          <Button as={'a'} w={'full'} py={3} colorScheme={variant} href={path}>{lang.buttonText}</Button>
        </VStack>
      </VStack>
    </Card>
  );
};

export default ProductPriceCard