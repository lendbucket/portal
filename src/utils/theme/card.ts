import { mode } from '@chakra-ui/theme-tools';
const Card = {
  baseStyle: (props: any) => ({
    p: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: 'secGray.100',
    minWidth: '0px',
    wordWrap: 'break-word',
    bg: mode('white', 'navy.800')(props),
    backgroundClip: 'border-box'
  }),
};

export const CardComponent = {
  components: {
    Card
  }
};
