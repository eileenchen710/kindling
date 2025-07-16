'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Company } from '@/lib/data';
import CompanyCard from './CompanyCard';
import CompanyTable from './CompanyTable';
import CompanyDetail from './CompanyDetail';
import FilterPanel from './FilterPanel';
import AnimatedButton from './AnimatedButton';
import {
  Container,
  VStack,
  HStack,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

function getCompanyIdFromParams(searchParams: any): string | null {
  if (typeof window !== 'undefined') {
    // On client, use window.location.search
    const params = new URLSearchParams(window.location.search);
    return params.get('company');
  }
  // On server or if already URLSearchParams
  if (searchParams && typeof searchParams.get === 'function') {
    return searchParams.get('company');
  }
  if (typeof searchParams === 'object') {
    // Next.js may pass a plain object
    return searchParams.company || null;
  }
  return null;
}

export default function ClientPage({
  companies,
  searchParams,
}: {
  companies: Company[];
  searchParams: any;
}) {
  const [view, setView] = useState<'card' | 'table'>('card');
  const [selected, setSelected] = useState<Company | null>(null);
  const [filter, setFilter] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const companyId = getCompanyIdFromParams(searchParams);

  const filteredCompanies = useMemo(() => {
    if (filter.length === 0) return companies;
    return companies.filter((c) => c.focus.some((f) => filter.includes(f)));
  }, [companies, filter]);

  useEffect(() => {
    if (companyId && companies.length > 0) {
      const found = companies.find((c) => c.id === companyId);
      if (found) {
        setSelected(found);
        setModalOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, companies]);

  const handleOpenModal = (company: Company) => {
    setSelected(company);
    setModalOpen(true);
    router.replace(`/?company=${company.id}`, { scroll: false });
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelected(null);
    router.replace('/', { scroll: false });
  };

  return (
    <Container maxW="6xl" py={8} pt={32}>
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <Heading as="h5" size="md" fontWeight={500}>
            Companies
          </Heading>
          <HStack>
            <AnimatedButton
              colorScheme={undefined}
              variant={undefined}
              onClick={() => setView('card')}
            >
              Card View
            </AnimatedButton>
            <AnimatedButton
              colorScheme={undefined}
              variant={undefined}
              onClick={() => setView('table')}
            >
              Table View
            </AnimatedButton>
          </HStack>
        </HStack>
        <Heading
          as="h2"
          size="lg"
          fontWeight={600}
          w={{ base: '100%', md: '60%' }}
        >
          Discover the world’s top tech companies at a glance. Quick to explore
          your tech company intelligence hub.
        </Heading>
        <FilterPanel
          options={[...new Set(companies.flatMap((c) => c.focus))]}
          value={filter}
          onChange={(v) => setFilter(v as string[])}
          label="Focus Filter"
        />
        {view === 'card' ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={() => handleOpenModal(company)}
              />
            ))}
          </SimpleGrid>
        ) : (
          <CompanyTable
            companies={filteredCompanies}
            onRowClick={handleOpenModal}
          />
        )}
        <CompanyDetail
          company={selected}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      </VStack>
    </Container>
  );
}
