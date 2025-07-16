import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { Company } from '@/lib/data';

interface Props {
  companies: Company[];
  onRowClick?: (company: Company) => void;
}

export default function CompanyTable({ companies, onRowClick }: Props) {
  const tableBg = useColorModeValue('white', '#000');
  return (
    <Box overflowX="auto" borderRadius="lg" boxShadow="base" bg={tableBg}>
      <Table variant="simple" size="md" bg={tableBg}>
        <Thead>
          <Tr>
            <Th>Logo</Th>
            <Th>Name</Th>
            <Th>Tagline</Th>
            <Th>Focus</Th>
            <Th>Location</Th>
            <Th>Employees</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies.map((company) => (
            <Tr
              key={company.id}
              _hover={{
                bg: useColorModeValue('gray.50', 'gray.900'),
                cursor: 'pointer',
              }}
              onClick={() => onRowClick?.(company)}
            >
              <Td>
                <img
                  src={company.logo}
                  alt={company.name}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: '#f3f3f3',
                  }}
                />
              </Td>
              <Td>{company.name}</Td>
              <Td>{company.tagline}</Td>
              <Td>{company.focus.join(', ')}</Td>
              <Td>{company.location}</Td>
              <Td>{company.employeeCount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
