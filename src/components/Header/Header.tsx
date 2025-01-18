'use client';

import React, { useState } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image
                    src="/Logo.webp"
                    alt="Logo de Ecommerce"
                    width={40}
                    height={40}
                />
            </div>
            <div className={styles.search}>
                <MagnifyingGlassIcon className={styles.icon} />
                <input
                    type="text"
                    placeholder="Buscar producto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </header>
    );
};

export default Header;
