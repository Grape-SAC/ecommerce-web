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
};

export default function Header({
    showLogo = true,
    showSearch = true,
    showCart = true,
    showBack = false,
    title = "",
    backHref,
}: HeaderProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isCheckout = pathname.startsWith("/finalizar-compra");
    const isIdentificacion = pathname.includes("identificacion");
    const isEntrega = pathname.includes("entrega");
    const isPago = pathname.includes("pago");

    useEffect(() => {
        // Cada vez que la URL cambie → apagamos el loading
        setIsNavigating(false);
    }, [pathname]);

    const getCheckoutBackHref = () => {
        if (isIdentificacion) return "/carrito";
        if (isEntrega) return "/finalizar-compra/identificacion";
        if (isPago) return "/finalizar-compra/entrega";

        return backHref || null; // fallback por si lo mandaste por prop
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            setIsNavigating(true);
            router.push(`/buscar/${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleBack = () => {
        setIsNavigating(true);

        if (isCheckout) {
            const href = getCheckoutBackHref();
            if (href) {
                router.push(href);
                return;
            }
        }

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

            <header className={showBack ? styles.headerWithBack : styles.header}>
                {showBack && (
                    <button
                        onClick={handleBack}
                        className={styles.backButton}
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

                {showCart && (
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
                )}
            </header>
        </>
    );
}
