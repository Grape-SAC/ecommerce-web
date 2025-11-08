'use client';

import React, { useState } from 'react';
import styles from './header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import NProgress from 'nprogress';
import Link from 'next/link';
import CartCounter from '@/components/ui/cart-counter/cart-counter';

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            NProgress.start();
            router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image
                    src="/Logo.webp"
                    alt="Logo de Ecommerce"
                    width={35}
                    height={35}
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
            <div className={styles.cart}>
                <Link
                    href="/cart"
                    aria-label="Ver carrito de compras"
                    onClick={() => {
                        NProgress.start();
                    }}
                >
                    <div className={styles.cartIconContainer}>
                        <ShoppingCartIcon className={styles.icon} />
                        <CartCounter />
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
