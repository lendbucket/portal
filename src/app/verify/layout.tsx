import { StackDivider, VStack } from "@chakra-ui/react"
import HeaderProduct from "@/app/_components/common/HeaderProduct"
import FooterTerms from "@/app/_components/common/FooterTerms"

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="verify">
      <div className="w-full verify-wrapper">
        <HeaderProduct />
        <VStack divider={<StackDivider borderColor='gray.200' />} spacing={16}>
          {children}
          <FooterTerms />
        </VStack>
      </div>
    </section >
  )
}