import { fetchCompanies } from '@/lib/api';
import ClientPage from '@/components/ClientPage';

export default async function Page({ searchParams }: { searchParams: any }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/companies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch company list');
  const companies = await res.json();

  return <ClientPage companies={companies} searchParams={searchParams} />;
}
