import { StackDivider, VStack } from "@chakra-ui/react"
import HeaderProduct from "@/app/_components/common/HeaderProduct"
import FooterTerms from "@/app/_components/common/FooterTerms"

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="signup">
      <div className="w-full signup-wrapper">
        <HeaderProduct />
        <VStack divider={<StackDivider borderColor='gray.200' />} spacing={16}>
          {children}
          <FooterTerms />
        </VStack>
      </div>
    </section >
  )
}