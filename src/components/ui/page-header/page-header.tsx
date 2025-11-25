'use client';

import styles from './page-header.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NProgress from 'nprogress';
import { useState } from 'react';
import { LoadingPage } from '../loading-page/loading-page';

type PageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
  showBackLink?: boolean;
};

const PageHeader = ({ title, backHref = '/', backLabel = '', showBackLink = true, }: PageHeaderProps) => {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <div className={styles.header}>
      {isNavigating && <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />}

      {showBackLink && (
        <Link
          href={backHref}
          className={styles.backLink}
          onClick={() => {
            setIsNavigating(true)
          }}
        >
          <ArrowLeftIcon className={styles.icon} />
          <span>{backLabel}</span>
        </Link>
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default PageHeader;
