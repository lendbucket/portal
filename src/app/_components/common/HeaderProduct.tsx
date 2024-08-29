
"use client";

import { Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";

export default function HeaderProduct() {
  const params = useSearchParams()
  const path = usePathname()

  return (
    <Flex className="product-header">
      <Grid w={'full'} templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} px={{ base: 4, md: 16 }} py={10} gap={{ base: 6, md: 20 }} alignItems={'baseline'}>
        <GridItem w='100%' h='100%' display={{ base: 'none', md: 'flex' }}>
        </GridItem>
        {params.get('product_option') ? (
          <GridItem w='100%' h='100%'>
            <Heading as={'h1'} fontSize={'3rem'} textAlign={'center'} textTransform={'uppercase'}>{params.get('product_option')}</Heading>
            <Text textAlign={'center'}>A CreditBolt Product</Text>
          </GridItem>
        ) : (
          <GridItem w='100%' h='100%'>
            <Heading as={'h1'} fontSize={'3rem'} textAlign={'center'}>CreditBolt</Heading>
          </GridItem>
        )}
        {path === '/signin' && (
          <GridItem w='100%' h='100%'>
            <Flex w={'full'} justifyContent={'end'} alignItems={'center'} gap={3}>
              <Text display={{ base: 'none', md: 'block' }}>Don&apos;t have an account?</Text>
              <Button as={'a'} py={3} variant={'outline'} colorScheme={'gray'} href="/signup">Apply</Button>
            </Flex>
          </GridItem>
        )}
        {path === '/signup' && (
          <GridItem w='100%' h='100%'>
            <Flex w={'full'} justifyContent={'end'} alignItems={'center'} gap={3}>
              <Text display={{ base: 'none', md: 'block' }}>Have an account?</Text>
              <Button as={'a'} py={3} variant={'outline'} colorScheme={'gray'} href={'/signin'}>Login</Button>
            </Flex>
          </GridItem>
        )}
      </Grid>
    </Flex>
  );
}
