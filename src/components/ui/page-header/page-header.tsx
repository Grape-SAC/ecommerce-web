'use client';

import styles from './page-header.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingPage } from '../loading-page/loading-page';

type PageHeaderProps = {
  title: string;
  backHref?: string;     // si está definido, va a esa ruta
  backLabel?: string;
  showBackLink?: boolean;
};

const PageHeader = ({
  title,
  backHref,
  backLabel = '',
  showBackLink = true,
}: PageHeaderProps) => {

  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    setIsNavigating(true);

    if (backHref) {
      // 🔵 comportamiento actual: ir a una ruta específica
      router.push(backHref);
    } else {
      // 🔥 nuevo comportamiento: volver a la página previa
      router.back();
    }
  };

  return (
    <div className={styles.header}>

      {isNavigating && (
        <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />
      )}

      {showBackLink && (
        <>
          {backHref ? (
            // 🔵 SI backHref existe → usar Link tradicional
            <Link
              href={backHref}
              className={styles.backLink}
              onClick={() => setIsNavigating(true)}
            >
              <ArrowLeftIcon className={styles.icon} />
              <span>{backLabel}</span>
            </Link>
          ) : (
            // 🔥 SI NO hay backHref → usar router.back()
            <button
              onClick={handleBack}
              className={styles.backLink}
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <ArrowLeftIcon className={styles.icon} />
              <span>{backLabel}</span>
            </button>
          )}
        </>
      )}

      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default PageHeader;
