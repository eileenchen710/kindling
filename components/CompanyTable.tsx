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
      <Table variant="simple" size="md" bg={tableBg} aria-label="公司列表">
        <Thead>
          <Tr>
            <Th scope="col">Logo</Th>
            <Th scope="col">Name</Th>
            <Th scope="col">Tagline</Th>
            <Th scope="col">Focus</Th>
            <Th scope="col">Location</Th>
            <Th scope="col">Employees</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies.map((company) => (
            <Tr
              key={company.id}
              tabIndex={0}
              role="button"
              aria-label={`查看${company.name}详情`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onRowClick?.(company);
                }
              }}
              _hover={{
                bg: useColorModeValue('#fefefe', '#23272f'),
                cursor: 'pointer',
              }}
              style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
              onClick={() => onRowClick?.(company)}
            >
              <Td>
                <img
                  src={company.logo}
                  alt={`公司${company.name}的logo`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    objectFit: 'contain', // 保持原始比例不拉伸
                  }}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/file.svg';
                  }}
                  aria-label={`${company.name} logo`}
                />
              </Td>
              <Td style={{ fontWeight: 500 }}>{company.name}</Td>
              <Td style={{ fontWeight: 500 }}>{company.tagline}</Td>
              <Td style={{ fontWeight: 500 }}>{company.focus.join(', ')}</Td>
              <Td style={{ fontWeight: 500 }}>{company.location}</Td>
              <Td style={{ fontWeight: 500 }}>{company.employeeCount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
