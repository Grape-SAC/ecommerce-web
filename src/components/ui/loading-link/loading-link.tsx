'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';

type Props = {
    href: string;
    className?: string;
    children: React.ReactNode;
};

export default function LoadingLink({ href, className, children }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setLoading(true);
        router.push(href);
    };

    return (
        <>
            {loading && (
                <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />
            )}

            <a href={href} onClick={handleClick} className={className}>
                {children}
            </a>
        </>
    );
}
