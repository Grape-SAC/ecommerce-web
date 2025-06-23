'use client';

import { useEffect, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

export default function useNProgress() {
  const pathname = usePathname();
  const [isPending] = useTransition();

  useEffect(() => {
    if (isPending) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isPending]);

  useEffect(() => {
    // asegura que NProgress termine al cambiar ruta
    NProgress.done();
  }, [pathname]);
}
