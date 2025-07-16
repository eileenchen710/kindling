'use client';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

export default function SiteFooter() {
  return (
    <Box
      as="footer"
      w="100%"
      py={6}
      px={4}
      bg={useColorModeValue('rgba(255,255,255,0.45)', 'rgba(0,0,0,0.45)')}
      textAlign="center"
      mt={12}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'background 0.25s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <Text fontSize="sm" fontWeight={600} color={useColorModeValue('gray.600', 'gray.400')}>
        © {new Date().getFullYear()} CompanyDemo. All rights reserved.
      </Text>
    </Box>
  );
}
