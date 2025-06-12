import styles from './Cart.module.css';
import CartSummaryView from "./cart-summary";
import CartItemView from "./cart-item";
import { CartItemType } from '../types/cart-item';

const CartView = ({ cartItems }: { cartItems: CartItemType[] }) => {

    if (cartItems.length === 0) {
        return <p>El carrito está vacío.</p>;
    }

    return (
        <section className={styles.cartContainer}>
            <h1 className={styles.title}>Mi Carrito</h1>
            <div className={styles.cartItems}>
                <ul>
                    {cartItems.map(item => (
                        <CartItemView key={item.id} item={item} />
                    ))}
                </ul>
            </div>
            <CartSummaryView items={cartItems} />
        </section>
    );
}

export default CartView;