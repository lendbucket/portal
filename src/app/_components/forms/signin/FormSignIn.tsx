"use client";
import { Alert, AlertIcon, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import lang from '@/snippet/en.json'

import Card from '@/app/_components/card/Card';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

const FormSignIn = () => {
  const fields = [
    {
      name: "email",
      label: lang.portal.signin.email,
      type: 'email',
      rules: {
        required: 'This field is required',
        pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" }
      }
    },
    {
      name: "password",
      label: lang.portal.signin.password,
      type: 'password',
      rules: {
        required: 'This field is required'
      }
    },
  ]

  const router = useRouter()
  const [error, setError] = useState(false)

  const formInstance = useForm();
  const { handleSubmit, register, formState: { errors, isSubmitting } } = formInstance;

  const onSubmit = async (values: Record<string, any>) => {
    const response: any = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (!response?.error) {
      console.log("logged in")
      router.push("/consumer/home");
    } else {
      setError(true)
    }
  }

  const parseInputElements = (field: FormFieldProps, index: number) => {
    const { label, name, type, rules } = field

    return (
      <GridItem colSpan={{ base: 1, md: 2 }} key={index}>
        <FormControl isInvalid={!!errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input type={type} {...register(name, rules)} />
          <FormErrorMessage>
            {String(errors[name] && errors[name]?.message) || ''}
          </FormErrorMessage>
        </FormControl>
      </GridItem>
    )
  }

  return (
    <>
      <Container maxW='8xl' display={'flex'} justifyContent={'center'}>
        <Card maxW='lg' py={16} px={10} h={'full'}>
          <VStack mb={6} alignItems={'start'}>
            <Heading as={'h2'} fontSize={'1.75rem'}>{lang.portal.signin.title}</Heading>
          </VStack>
          {error && (
            <Alert status='error' variant='left-accent' mb={3}>
              <AlertIcon />
              Email or Password Incorrect
            </Alert>
          )}
          <FormProvider {...formInstance}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                templateRows={`repeat(2, 1fr)`}
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                gap={6}
              >
                {fields.map((field, index) => (parseInputElements(field, index)))}
              </Grid>
              <Flex w={'full'} mt={6} gap={4}>
                <Button type="submit" w={'full'} colorScheme="lime" isLoading={isSubmitting}>Sign In</Button>
              </Flex>
            </form>
          </FormProvider>
        </Card>
      </Container>
    </>

  );
}

export default FormSignIn
