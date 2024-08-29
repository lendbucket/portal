"use client";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Heading, HStack, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
// import Autocomplete from "react-google-autocomplete";
import lang from '@/snippet/en.json'

import Card from '@/app/_components/card/Card';
import { Icon } from "@chakra-ui/icons";
import { getTemplateRows } from "@/utils";
import { FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import { useGlobalStore } from "@/provider/GlobalStoreProvider";

const FormSignUp = (props: FormProps) => {
  const { title, description, fields, defaultValues, onSubmit, isLoading } = props;
  const { showBackButton, onBack } = props;
  const [show, setShow] = useState(false)
  const { currentStep, info } = useGlobalStore(
    (state: any) => state,
  )
  const formInstance = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });
  const { handleSubmit, register, reset, watch, formState: { errors, isSubmitting } } = formInstance;

  const password = watch("password", "");

  const isValidLength = /^.{8,}$/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&#]/.test(password);

  const passordValidation = {
    validate: {
      length: (v: any) => isValidLength,
      upper: (v: any) => hasUpperCase,
      lower: (v: any) => hasLowerCase,
      number: (v: any) => hasNumber,
      specialChar: (v: any) => hasSpecialChar,
    },
  }

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleBack = () => {
    const values = formInstance.getValues();
    onBack(values);
  };

  const inputElementsByCondition = (field: FormFieldProps) => {
    const { name, type, mask, rules } = field
    if (mask) {
      return <Input type={type} as={InputMask} mask={mask} replacement={{ _: /\d/ }} showMask separate {...register(name, rules)} />
    }
    // else if (name === 'address') {
    //   return <Input as={Autocomplete} type={type} apiKey={GOOGLE_MAPS_API_KEY} {...register(name, rules)} />
    // } 
    else if (name === 'password') {
      return (
        <>
          <Input type={show ? 'text' : type} {...register(name, passordValidation)} />
          <InputRightElement width='4rem'>
            {show ? <Icon as={FiEyeOff} onClick={() => setShow(false)} /> : <Icon as={FiEye} onClick={() => setShow(true)} />}
          </InputRightElement>
        </>
      )
    } else {
      return <Input type={type} {...register(name, rules)} />
    }
  }

  const parseInputElements = (field: FormFieldProps, index: number) => {
    const { label, name, colSpan, helperText, icon, addon, optional } = field

    return (
      <GridItem colSpan={{ base: 1, md: colSpan }} key={index}>
        <FormControl isInvalid={!!errors[name]}>
          <FormLabel htmlFor={name} fontSize={'sm'}>{label} {optional ? '(Optional)' : ''}</FormLabel>
          <InputGroup>
            {icon &&
              <InputLeftElement pointerEvents='none'>
                <Icon as={icon} />
              </InputLeftElement>
            }
            {addon &&
              <InputLeftAddon>{addon}</InputLeftAddon>
            }
            {inputElementsByCondition(field)}
          </InputGroup>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          {errors && errors[name] && errors[name].message ? (
            <FormErrorMessage>
              {String(errors[name]?.message) || ''}
            </FormErrorMessage>
          ) : null}
        </FormControl>
      </GridItem>
    )
  }

  return (
    <Card maxW='lg' py={16} px={10} h={'full'}>
      <VStack mb={6} alignItems={'start'}>
        <Heading as={'h2'} fontSize={'1.75rem'}>{title}</Heading>
        <Text color={'gray.600'}>{description}</Text>
      </VStack>
      <FormProvider {...formInstance}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateRows={`repeat(${getTemplateRows(fields)}, 1fr)`}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={3}
          >
            {fields.map((field, index) => {
              return parseInputElements(field, index)
            })}
          </Grid>
          {currentStep === 5 && (
            <VStack w={'full'} alignItems={'start'} spacing={3} mt={8}>
              <Text fontSize={'0.875rem'}>{lang.portal.signup.step5.password.title}</Text>
              <VStack w={'full'} alignItems={'start'} spacing={1}>
                <HStack color={!isValidLength ? 'red.500' : 'lime.500'}>
                  <Icon as={FiCheck} fontSize={'0.875rem'} />
                  <Text fontSize={'0.875rem'}>{lang.portal.signup.step5.password.length}</Text>
                </HStack>
                <HStack color={!hasUpperCase || !hasLowerCase ? 'red.500' : 'lime.500'}>
                  <Icon as={FiCheck} fontSize={'0.875rem'} />
                  <Text fontSize={'0.875rem'}>{lang.portal.signup.step5.password.uppercaseLower}</Text>
                </HStack>
                <HStack color={!hasNumber ? 'red.500' : 'lime.500'}>
                  <Icon as={FiCheck} fontSize={'0.875rem'} />
                  <Text fontSize={'0.875rem'}>{lang.portal.signup.step5.password.number}</Text>
                </HStack>
                <HStack color={!hasSpecialChar ? 'red.500' : 'lime.500'}>
                  <Icon as={FiCheck} fontSize={'0.875rem'} />
                  <Text fontSize={'0.875rem'}>{lang.portal.signup.step5.password.special}</Text>
                </HStack>
              </VStack>
            </VStack>
          )}
          <Flex w={'full'} mt={6} justifyContent={'space-between'} gap={4}>
            {showBackButton && (
              <Button type="button" w={'full'} onClick={handleBack}>Back</Button>
            )}
            <Button type="submit" w={'full'} colorScheme="lime" isLoading={isLoading}>Next</Button>
          </Flex>
        </form>
      </FormProvider>
    </Card>
  );
}

export default FormSignUp
