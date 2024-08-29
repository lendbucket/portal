'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/utils/theme/theme'

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}