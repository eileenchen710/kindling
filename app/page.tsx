'use client';
import { useState, useEffect, useMemo } from 'react';
import { fetchCompanies } from '@/lib/api';
import { Company } from '@/lib/data';
import CompanyCard from '@/components/CompanyCard';
import CompanyTable from '@/components/CompanyTable';
import CompanyDetail from '@/components/CompanyDetail';
import FilterPanel from '@/components/FilterPanel';
import AnimatedButton from '@/components/AnimatedButton';
import {
  Box,
  Container,
  SimpleGrid,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'card' | 'table'>('card');
  const [selected, setSelected] = useState<Company | null>(null);
  const [filter, setFilter] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get('company');

  useEffect(() => {
    fetchCompanies()
      .then((data) => setCompanies(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredCompanies = useMemo(() => {
    if (filter.length === 0) return companies;
    return companies.filter((c) => c.focus.some((f) => filter.includes(f)));
  }, [companies, filter]);

  // Modal state同步URL
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

  // 打开modal时同步URL
  const handleOpenModal = (company: Company) => {
    setSelected(company);
    setModalOpen(true);
    router.replace(`/?company=${company.id}`, { scroll: false });
  };

  // 关闭modal时清除URL参数
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelected(null);
    router.replace('/', { scroll: false });
  };

  if (loading) {
    return (
      <Container maxW="6xl" py={8}>
        <VStack align="center" justify="center" minH="60vh">
          <Heading size="md">Loading...</Heading>
        </VStack>
      </Container>
    );
  }

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
          Discover the world’s top tech companies at a glance. Quick to explore your tech company intelligence hub.
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
