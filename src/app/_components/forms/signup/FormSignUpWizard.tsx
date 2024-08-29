"use client";
import { useEffect, useMemo, useState } from "react";
import FormSignUp from "./FormSignUp";
import { useGlobalStore } from "@/provider/GlobalStoreProvider";
import { v4 as uuidv4 } from 'uuid';

const FormSignUpWizard = (props: FormWizardProps) => {
  const { preStep, nextStep, setInfo } = useGlobalStore(
    (state) => state,
  )
  const { steps, defaultValues, onSubmit, isLoading } = props;
  const [values, setValues] = useState<Record<string, any>>({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = useMemo(
    () => steps[activeStepIndex],
    [activeStepIndex, steps]
  );
  const isLastStep = useMemo(
    () => activeStepIndex === steps.length - 1,
    [activeStepIndex, steps.length]
  );

  const goNextStep = () => {
    setActiveStepIndex((index) => (index += 1));
    nextStep()
  };

  const goPrevStep = () => {
    setActiveStepIndex((index) => (index -= 1));
    preStep()
  };

  const handleNextStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);
    setInfo(newValues)
    if (isLastStep) {
      onSubmit(newValues);
    } else {
      goNextStep();
    }
  };

  const handleBackStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);
    goPrevStep();
  };

  useEffect(() => {
    const id = uuidv4(); // Generate a random UUID
    setValues({ ...values, id: id });
  }, [])

  if (!activeStep) {
    return null;
  }

  return (
    <>
      <FormSignUp
        key={activeStep.id}
        fields={activeStep.fields}
        title={activeStep.title}
        description={activeStep.description}
        defaultValues={{ ...defaultValues, ...values }}
        showBackButton={!!activeStepIndex}
        isLoading={isLoading}
        onSubmit={handleNextStep}
        onBack={handleBackStep}
      />
    </>
  );
}

export default FormSignUpWizard
