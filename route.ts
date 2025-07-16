import { NextResponse } from 'next/server';
import { companies, Company } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const company = (companies as Company[]).find((c) => c.id === params.id);
  if (!company) return notFound();
  return NextResponse.json(company);
}
