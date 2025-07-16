export async function fetchCompanies(baseUrl?: string) {
  let url = '';
  if (typeof window === 'undefined') {
    url =
      baseUrl ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');
    url += '/api/companies';
  } else {
    url = '/api/companies';
  }
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch company list');
  return res.json();
}

export async function fetchCompanyById(id: string, baseUrl?: string) {
  let url = '';
  if (typeof window === 'undefined') {
    url =
      baseUrl ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');
    url += `/api/companies/${id}`;
  } else {
    url = `/api/companies/${id}`;
  }
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch company detail');
  return res.json();
}
