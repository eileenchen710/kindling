import {
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface FilterPanelProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

export default function FilterPanel({
  options,
  value,
  onChange,
  label,
}: FilterPanelProps) {
  const panelBg = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box p={4} bg={panelBg} borderRadius="lg" boxShadow="base" overflowX="auto">
      {label && (
        <Text fontWeight={600} mb={2} fontSize="md" color={textColor}>
          {label}
        </Text>
      )}
      <CheckboxGroup value={value} onChange={onChange}>
        <Stack direction="row" spacing={4} flexWrap="nowrap">
          {options.slice(0, 5).map((option) => (
            <Checkbox
              key={option}
              value={option}
              colorScheme="blue"
              color={textColor}
              whiteSpace="nowrap"
              fontWeight={600}
            >
              {option}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
}
