'use client';

import React from 'react';
import { Providers } from '@/store/providers';
import useNProgress from './use-nprogress';
import { useAutenticacion } from '@/config/hooks/use-autenticacion';

function InnerLayout({ children }: { children: React.ReactNode }) {
  useNProgress();
  useAutenticacion(); // ✅ Ya dentro del Redux Provider

  return <>{children}</>;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <InnerLayout>{children}</InnerLayout>
    </Providers>
  );
}
