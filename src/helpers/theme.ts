import { extendTheme } from '@chakra-ui/react';

interface themeInterface {
  config: {
    initalColorMode: string;
    useSystemColorMode: boolean;
  };
  styles: object;
}

const theme: themeInterface = {
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
