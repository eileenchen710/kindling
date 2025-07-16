'use client';
import {
  Flex,
  Switch,
  Box,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Flex align="center" justify="flex-end" w="100%">
      <Switch
        isChecked={isDark}
        onChange={toggleColorMode}
        colorScheme="blue"
        mr={2}
      />
      <Box fontSize="sm" color={useColorModeValue('gray.600', 'gray.100')}>
        {isDark ? 'Dark' : 'Light'}
      </Box>
    </Flex>
  );
}
