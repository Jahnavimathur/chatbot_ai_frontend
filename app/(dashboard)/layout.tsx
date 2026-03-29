'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  if (!isMounted) return null; // Prevent hydration mismatch

  return <DashboardLayout>{children}</DashboardLayout>;
}
