'use client';

import styles from './bottom-nav-bar.module.css';
import Link from 'next/link';
import { HomeIcon, Squares2X2Icon, ShoppingCartIcon, CubeIcon, UserCircleIcon, HeartIcon } from '@heroicons/react/24/outline';
import CartCounter from '@/components/ui/cart-counter/cart-counter';
import NProgress from 'nprogress';

type HeaderProps = {
    className?: string;
};

const BottomNavBar: React.FC<HeaderProps> = ({ className }) => {

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/" aria-label="Ir a inicio">
                        <HomeIcon className={styles.icon} />
                        <span>Inicio</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/category" aria-label="Ver categorías">
                        <Squares2X2Icon className={styles.icon} />
                        <span>Categorías</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/favorites" aria-label="Ver favoritos">
                        <HeartIcon className={styles.icon} />
                        <span>Favoritos</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/orders" aria-label="Ver pedidos">
                        <CubeIcon className={styles.icon} />
                        <span>Pedidos</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/account" aria-label="Ver mi cuenta">
                        <UserCircleIcon className={styles.icon} />
                        <span>Mi Cuenta</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default BottomNavBar;
