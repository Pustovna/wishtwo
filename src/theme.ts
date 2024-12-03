'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#00c59f'
    }, 
    text: {
      primary: '#ffffff',
      secondary: '#ba8d8d'
    },
    action: {
    
      disabledBackground: '#5c6765'
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#ffffff', // Цвет границы по умолчанию
          },
          // '&:hover fieldset': {
          //   borderColor: '#ffffff', // Цвет границы при наведении
          // },
          // '&.Mui-focused fieldset': {
          //   borderColor: '#ffffff', // Цвет границы при фокусе
          // },
        },
      },
    },
  },
});

export default theme;
