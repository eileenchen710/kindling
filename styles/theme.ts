import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      500: 'rgb(36, 152, 236)',
    },
    blue: {
      50: 'rgb(225,245,255)',
      100: 'rgb(200,235,255)',
      200: 'rgb(170,220,250)',
      300: 'rgb(120,200,245)',
      400: 'rgb(80,180,240)',
      500: 'rgb(36, 152, 236)',
      600: 'rgb(30, 130, 200)',
      700: 'rgb(24, 110, 170)',
      800: 'rgb(18, 90, 140)',
      900: 'rgb(12, 70, 110)',
    },
    gray: {
      900: '#000',
      800: '#111',
      700: '#222',
      600: '#333',
      500: '#444',
      400: '#555',
      300: '#666',
      200: '#888',
      100: '#aaa',
      50: '#ccc',
    },
    black: '#000',
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
});

export default theme;
