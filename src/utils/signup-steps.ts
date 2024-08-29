import lang from '@/snippet/en.json'

export const signupSteps: FormWizardStepProps[] = [
  {
    id: "STEP_1",
    title: lang.portal.signup.step1.title,
    description: lang.portal.signup.step1.description,
    fields: [
      {
        name: "email",
        label: "Email",
        type: 'email',
        input: 'input',
        mask: '',
        colSpan: 2,
        rules: {
          required: 'This field is required',
          pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" }
        }
      },
      {
        name: "firstname",
        label: "First Name",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 1,
        rules: {
          required: 'This field is required'
        }
      },
      {
        name: "lastname",
        label: "Last Name",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 1,
        rules: {
          required: 'This field is required'
        }
      },
    ]
  },
  {
    id: "STEP_2",
    title: lang.portal.signup.step2.title,
    description: lang.portal.signup.step2.description,
    fields: [
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
        }
      },
    ]
  },
  {
    id: "STEP_3",
    title: lang.portal.signup.step3.title,
    description: lang.portal.signup.step3.description,
    fields: [
      {
        name: "mobile",
        label: "Mobile Phone",
        type: 'text',
        input: 'input',
        mask: '___-___-____',
        colSpan: 2,
        rules: {
          required: 'This field is required',
          pattern: {
            value: /^\d{3}-\d{3}-\d{4}$/,
            message: "Invalid Phone number"
          }
        },
        addon: '+1'
      },
    ]
  },
  {
    id: "STEP_4",
    title: lang.portal.signup.step4.title,
    description: lang.portal.signup.step4.description,
    fields: [
      {
        name: "address1",
        label: "Address (no P.O. boxes)",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 2,
        rules: {
          required: 'This field is required',
        },
      },
      {
        name: "city",
        label: "City",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 1,
        rules: {
          required: 'This field is required',
        },
      },
      {
        name: "state",
        label: "State",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 1,
        rules: {
          required: 'This field is required',
        },
      },
      {
        name: "zipcode",
        label: "Zip code",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 1,
        rules: {
          required: 'This field is required',
        },
      },
      {
        name: "apt",
        label: "Apt/Suite number",
        type: 'text',
        input: 'input',
        mask: '',
        colSpan: 1,
        optional: true,
        rules: {},
      },
    ]
  },
  {
    id: "STEP_5",
    title: lang.portal.signup.step5.title,
    description: lang.portal.signup.step5.description,
    fields: [
      {
        name: "password",
        label: "Password",
        type: 'password',
        input: 'input',
        mask: '',
        colSpan: 2,
      },
    ]
  },
];
