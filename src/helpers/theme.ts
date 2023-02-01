import { extendTheme } from '@chakra-ui/react';
import { ThemeInterface } from './types';

const theme: ThemeInterface = {
  config: {
    initalColorMode: 'dark',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        margin: '0',
        fontFamily: 'sans-serif',
        webkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      code: {
        fontFamily: 'source code-pro',
      },
    },
  },
};

export default extendTheme(theme);
