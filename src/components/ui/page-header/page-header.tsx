'use client';

import styles from './page-header.module.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NProgress from 'nprogress';

type PageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
  showBackLink?: boolean;
};

const PageHeader = ({ title, backHref = '/', backLabel = '', showBackLink = true, }: PageHeaderProps) => {
  return (
    <div className={styles.header}>
      {showBackLink && (
        <Link
          href={backHref}
          className={styles.backLink}
          onClick={() => {
            NProgress.start();
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
