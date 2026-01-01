'use client';

import { useEffect, useState } from 'react';
import styles from './header.module.css';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import CartCounter from '@/components/ui/cart-counter/cart-counter';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';

type HeaderProps = {
    showLogo?: boolean;
    showSearch?: boolean;
    showCart?: boolean;
    showBack?: boolean;
    title?: string;
    backHref?: string;
    shadow?: boolean;
    justify?: "center" | "space-between" | "flex-start" | "flex-end";
    backAbsolute?: boolean; 
};

export default function Header({
    showLogo = true,
    showSearch = true,
    showCart = true,
    showBack = false,
    title = "",
    backHref,
    shadow = false,
    justify = "space-between",
    backAbsolute = false
}: HeaderProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Cada vez que la URL cambie → apagamos el loading
        setIsNavigating(false);
    }, [pathname]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            setIsNavigating(true);
            router.push(`/buscar/${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleBack = () => {
        setIsNavigating(true);

        if (backHref) {
            router.push(backHref);
        } else {
            router.back();
        }
    };

    return (
        <>
            {isNavigating && (
                <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />
            )}

            <header
                className={`${styles.header} ${shadow ? styles.shadow : ""}`}
                style={{ justifyContent: justify }}
            >
                {showBack && (
                    <button
                        onClick={handleBack}
                        className={`${styles.backButton} ${backAbsolute ? styles.backAbsolute : ""}`}
                    >
                        <ArrowLeftIcon className={styles.backIcon} />
                    </button>
                )}

                {showLogo && (
                    <div className={styles.logo}>
                        <Image
                            src="/Logo.webp"
                            alt="Logo de Ecommerce"
                            width={35}
                            height={35}
                        />
                    </div>
                )}

                {title && (
                    <h1 className={styles.title}>{title}</h1>
                )}

                {showSearch && (
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
                )}

                {showCart ? (
                    <div className={styles.cart}>
                        <Link
                            href={`/carrito?from=${encodeURIComponent(pathname)}`}
                            aria-label="Ver carrito de compras"
                            onClick={() => setIsNavigating(true)}
                        >
                            <div className={styles.cartIconContainer}>
                                <ShoppingCartIcon className={styles.icon} />
                                <CartCounter />
                            </div>
                        </Link>
                    </div>
                ) : (<div></div>)}
            </header>
        </>
    );
}
