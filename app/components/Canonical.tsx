'use client';

import { usePathname } from 'next/navigation';

export default function Canonical() {
  const pathname = usePathname();
  const baseUrl = 'https://onlinecalcpro.com'; // замените на ваш домен
  const canonicalUrl = `${baseUrl}${pathname}`;
  return <link rel="canonical" href={canonicalUrl} />;
}