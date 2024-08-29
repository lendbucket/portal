import lang from '@/snippet/en.json'
import { FiLock } from 'react-icons/fi';

export const identitySteps: FormWizardStepProps[] = [
  {
    id: "IDENTITY_STEP_1",
    title: lang.portal.identity.step1.title,
    description: lang.portal.identity.step1.description,
    fields: [
      {
        name: "ssn",
        label: "Social Security Number",
        type: 'text',
        input: 'input',
        mask: '___-__-____',
        colSpan: 2,
        helperText: lang.portal.identity.step1.helper,
        icon: FiLock
      },
    ]
  },
  {
    id: "IDENTITY_STEP_2",
    title: lang.portal.identity.step2.title,
    description: lang.portal.identity.step2.description,
    fields: [
      {
        name: "firstname",
        label: "Legal First Name",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 2,
        rules: {
          required: 'This field is required'
        },
        icon: FiLock
      },
      {
        name: "middlename",
        label: "Middle Initial",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 2,
        optional: true,
        rules: {},
        icon: FiLock
      },
      {
        name: "lastname",
        label: "Legal Last Name",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 2,
        rules: {
          required: 'This field is required'
        },
        icon: FiLock
      },
      {
        name: "suffix",
        label: "Suffix",
        type: 'text',
        input: 'select',
        mask: '',
        colSpan: 2,
        optional: true,
        rules: {},
        icon: FiLock
      },
      {
        name: "ssn",
        label: "Social Security Number",
        type: 'text',
        input: 'input',
        mask: '___-__-____',
        colSpan: 2,
        icon: FiLock
      },
      {
        name: "dateBirth",
        label: "Date of Birth",
        type: 'text',
        input: 'input',
        mask: '__/__/____',
        colSpan: 2,
        rules: {
          required: 'This field is required',
          pattern: {
            value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
            message: "Invalid Date"
          }
        },
        icon: FiLock
      },
    ]
  },
];
