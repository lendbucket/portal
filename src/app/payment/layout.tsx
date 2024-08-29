import { StackDivider, VStack } from "@chakra-ui/react"
import HeaderProduct from "@/app/_components/common/HeaderProduct"
import FooterTerms from "@/app/_components/common/FooterTerms"

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="payment">
      <div className="w-full payment-wrapper">
        <HeaderProduct />
        <VStack divider={<StackDivider borderColor='gray.200' />} spacing={16}>
          {children}
          <FooterTerms />
        </VStack>
      </div>
    </section >
  )
}