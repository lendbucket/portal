"use client";
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, HStack, Icon, Link, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'
import { FiChevronsUp } from "react-icons/fi";
import Card from './Card';

export const ProductCard = ({
  path,
  lang,
  variant,
  isLearnMore = false
}: {
  path: string,
  lang: any
  variant?: string
  isLearnMore?: boolean
}) => {

  return (
    <Card maxW='md' p={0} h={'full'} flexGrow={2}>
      <VStack bg={'secGray.800'} color={'white'} py={3} borderTopRadius={'10px'}>
        <Heading size={'lg'} color={`${variant}.500`}>{lang.name}</Heading>
        <Text fontSize={'14px'}>{lang.description}</Text>
      </VStack>
      <HStack bg={'secGray.50'} py={3} px={5} gap={5}>
        <Flex >
          <Icon as={FiChevronsUp} color={`${variant}.500`} fontSize={'3rem'} />
          <Text fontSize={'2.25rem'} fontWeight={600}>{lang.pointIncrease}</Text>
        </Flex>
        <VStack spacing={0} alignItems={'start'}>
          <Text fontSize={'1.25rem'} fontWeight={600}>{lang.pi_title}</Text>
          <Text fontSize={'1rem'}>{lang.pi_description}</Text>
        </VStack>
      </HStack>
      <VStack w={'full'} h={'full'} bg={'secGray.100'} justifyContent={'space-between'} pt={10} pb={8} px={10} gap={8} borderBottomRadius={'10px'}>
        <Box h={'full'}>
          <UnorderedList spacing={5}>
            {lang.features?.map((item: string, index: number) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </UnorderedList>
        </Box>
        <VStack w={'full'} spacing={5}>
          <Button as={'a'} w={'full'} py={3} colorScheme={variant} href={path}>{lang.buttonText}</Button>
          {isLearnMore && (
            <Link as={NextLink} href='/learn-more' isExternal>
              Learn More
            </Link>
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

export default ProductCard