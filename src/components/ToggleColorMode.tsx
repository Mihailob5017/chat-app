import { Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
type Props = {};

const ToggleColorMode = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggleColorMode = (): void => toggleColorMode();

  return (
    <Button
      top="0"
      right="0"
      pos="absolute"
      margin="1rem"
      onClick={handleToggleColorMode}
    >
      {colorMode === 'dark' ? (
        <SunIcon color="orange.200" />
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>
  );
};

export default ToggleColorMode;
