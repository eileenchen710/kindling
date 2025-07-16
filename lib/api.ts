export async function fetchCompanies() {
  const res = await fetch('/api/companies', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch company list');
  return res.json();
}

export async function fetchCompanyById(id: string) {
  const res = await fetch(`/api/companies/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch company detail');
  return res.json();
}
