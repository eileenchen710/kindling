export async function fetchCompanies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/companies`,
    {
      cache: 'no-store', // SSR/ISR/CSR 都可用
    }
  );
  if (!res.ok) throw new Error('获取公司列表失败');
  return res.json();
}

export async function fetchCompanyById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/companies/${id}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('获取公司详情失败');
  return res.json();
}
