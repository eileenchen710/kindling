'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
    const params = new URLSearchParams(window.location.search);
    return params.get('company');
  }
  if (searchParams && typeof searchParams.get === 'function') {
    return searchParams.get('company');
  }
  if (typeof searchParams === 'object') {
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
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
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
  }, [companyId, companies]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const focus = params.get('focus');
      if (focus) {
        setFilter(focus.split(',').filter(Boolean));
      }
    } else if (searchParams && typeof searchParams.get === 'function') {
      const focus = searchParams.get('focus');
      if (focus) {
        setFilter(focus.split(',').filter(Boolean));
      }
    } else if (typeof searchParams === 'object' && searchParams.focus) {
      setFilter(
        Array.isArray(searchParams.focus)
          ? searchParams.focus
          : searchParams.focus.split(',')
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (filter.length > 0) {
        params.set('focus', filter.join(','));
      } else {
        params.delete('focus');
      }
      if (selected) {
        params.set('company', selected.id);
      } else {
        params.delete('company');
      }
      const url = `${pathname}?${params.toString()}`;
      window.history.replaceState({}, '', url);
    } else if (router && typeof router.replace === 'function') {
      const params = new URLSearchParams(nextSearchParams.toString());
      if (filter.length > 0) {
        params.set('focus', filter.join(','));
      } else {
        params.delete('focus');
      }
      if (selected) {
        params.set('company', selected.id);
      } else {
        params.delete('company');
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [filter, selected]);

  const handleOpenModal = (company: Company) => {
    setSelected(company);
    setModalOpen(true);
    router.replace(`/?company=${company.id}`, { scroll: false });
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelected(null);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.delete('company');
      const url = `${pathname}?${params.toString()}`;
      window.history.replaceState({}, '', url);
    } else if (router && typeof router.replace === 'function') {
      const params = new URLSearchParams(nextSearchParams.toString());
      params.delete('company');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
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
          resultCount={filteredCompanies.length}
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
