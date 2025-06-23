import { CartItemType } from '../types/cart-item.type';
import styles from './cart.module.css';
import CartSummary from '../components/cart-summary';
import CartItem from '../components/cart-item';
import PageHeader from '@/components/ui/page-header/page-header';

const CartView = ({ cartItems }: { cartItems: CartItemType[] }) => {
    if (cartItems.length === 0) {
        return <p>El carrito está vacío.</p>;
    }

    return (
        <section className={styles.cartContainer}>
            <PageHeader title="Mi Carrito" backHref="/" />

            <div className={styles.cartItems}>
                <ul>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </ul>
            </div>

            <CartSummary items={cartItems} />
        </section>
    );
};

export default CartView;
