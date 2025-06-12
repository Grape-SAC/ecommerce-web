import styles from './BottomNavBar.module.css';
import Link from 'next/link';
import { HomeIcon, Squares2X2Icon, ShoppingCartIcon, CubeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import CartCounter from '@/shared/components/ui/CartCounter/CartCounter';

type HeaderProps = {
    className?: string;
};

const BottomNavBar: React.FC<HeaderProps> = ({ className }) => {

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/home" aria-label="Ir a inicio">
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
                    <Link href="/cart" aria-label="Ver carrito de compras">
                        <div className={styles.cartIconContainer}>
                            <ShoppingCartIcon className={styles.icon} />
                            <CartCounter />                            
                        </div>
                        <span>Carrito</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/orders" aria-label="Ver pedidos">
                        <CubeIcon className={styles.icon} />
                        <span>Pedidos</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/perfil" aria-label="Ver perfil">
                        <UserCircleIcon className={styles.icon} />
                        <span>Perfil</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default BottomNavBar;
