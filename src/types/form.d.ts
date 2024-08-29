export { };

declare global {
  interface FormWizardStepProps {
    id: string;
    title?: string;
    description?: string;
    fields: Array<FormFieldProps>;
  }

  interface FormWizardProps {
    steps: FormWizardStepProps[];
    defaultValues: Record<string, any>;
    onSubmit(values: Record<string, any>): void;
    isLoading?: boolean
  }

  interface FormFieldProps {
    name: string;
    label: string;
    type: string;
    input?: string;
    mask?: any;
    colSpan?: number;
    helperText?: string;
    addon?: string;
    icon?: any;
    rules?: any;
    optional?: boolean
  }

  interface FormProps {
    title?: string;
    description?: string;
    fields: Array<FormFieldProps>;
    defaultValues: Record<string, any>;
    showBackButton?: boolean;
    isLoading?: boolean
    onSubmit(values: Record<string, any>): void;
    onBack(values: Record<string, any>): void;
  }
}
