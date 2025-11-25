'use client';

import { useState } from 'react';
import styles from './header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import CartCounter from '@/components/ui/cart-counter/cart-counter';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            setIsNavigating(true);
            router.push(`/buscar/${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <>
            {isNavigating && (
                <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />
            )}

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
                        href="/carrito"
                        aria-label="Ver carrito de compras"
                        onClick={() => setIsNavigating(true)}
                    >
                        <div className={styles.cartIconContainer}>
                            <ShoppingCartIcon className={styles.icon} />
                            <CartCounter />
                        </div>
                    </Link>
                </div>
            </header>
        </>
    );
}
