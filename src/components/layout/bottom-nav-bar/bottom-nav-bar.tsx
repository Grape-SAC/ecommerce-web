'use client';

import styles from './bottom-nav-bar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    Squares2X2Icon,
    CubeIcon,
    UserCircleIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';

export default function BottomNavBar() {
    const [isNavigating, setIsNavigating] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            {isNavigating && (
                <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />
            )}

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}>
                        <Link href="/" onClick={() => setIsNavigating(true)}>
                            <HomeIcon className={styles.icon} />
                            <span>Inicio</span>
                        </Link>
                    </li>

                    <li className={`${styles.navItem} ${isActive('/category') ? styles.active : ''}`}>
                        <Link href="/category">
                            <Squares2X2Icon className={styles.icon} />
                            <span>Categorías</span>
                        </Link>
                    </li>

                    <li className={`${styles.navItem} ${isActive('/favorites') ? styles.active : ''}`}>
                        <Link href="/favorites">
                            <HeartIcon className={styles.icon} />
                            <span>Favoritos</span>
                        </Link>
                    </li>

                    <li className={`${styles.navItem} ${isActive('/mis-pedidos') ? styles.active : ''}`}>
                        <Link href="/mis-pedidos" onClick={() => setIsNavigating(true)}>
                            <CubeIcon className={styles.icon} />
                            <span>Pedidos</span>
                        </Link>
                    </li>

                    <li className={`${styles.navItem} ${isActive('/mi-cuenta') ? styles.active : ''}`}>
                        <Link href="/mi-cuenta" onClick={() => setIsNavigating(true)}>
                            <UserCircleIcon className={styles.icon} />
                            <span>Mi Cuenta</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
