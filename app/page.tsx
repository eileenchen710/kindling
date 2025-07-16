import { fetchCompanies } from '@/lib/api';
import { Company } from '@/lib/data';
import CompanyCard from '@/components/CompanyCard';
import CompanyTable from '@/components/CompanyTable';
import CompanyDetail from '@/components/CompanyDetail';
import FilterPanel from '@/components/FilterPanel';
import AnimatedButton from '@/components/AnimatedButton';
import ClientPage from '@/components/ClientPage';
import {
  Box,
  Container,
  SimpleGrid,
  HStack,
  VStack,
  Heading,
} from '@chakra-ui/react';

export default async function Page({ searchParams }: { searchParams: any }) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const companies: Company[] = await fetchCompanies(baseUrl);
  return <ClientPage companies={companies} searchParams={searchParams} />;
}
