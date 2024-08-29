
"use client";

import { Text, VStack } from "@chakra-ui/react";
import { getCopyRight } from '@/utils'
import lang from '@/snippet/en.json'

export default function FooterTerms() {
  return (
    <VStack textAlign={'center'} color={'gray.500'} mb={10} px={16}>
      <Text fontSize={'14px'} fontWeight={600} textTransform={'uppercase'}>{lang.portal.signup.terms.title}</Text>
      <Text fontSize={'12px'}>{lang.portal.signup.terms.description}</Text>
      <Text fontSize={'14px'} mt={3}>{getCopyRight(lang.portal.signup.copyright)}</Text>
      <Text fontSize={'14px'}>{lang.portal.signup.company}</Text>
    </VStack>
  );
}
