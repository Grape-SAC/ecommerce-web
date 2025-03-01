import { CartItem } from "@/store/slices/cart.slice";
import styles from './Cart.module.css';
import CartSummary from "./CartSummary";
import CartItemComponent from "./CartItem";

const Cart = ({ cartItems }: { cartItems: CartItem[] }) => {

    if (cartItems.length === 0) {
        return <p>El carrito está vacío.</p>;
    }

    return (
        <section className={styles.cartContainer}>
            <h1 className={styles.title}>Mi Carrito</h1>
            <div className={styles.cartItems}>
                <ul>
                    {cartItems.map(item => (
                        <CartItemComponent key={item.id} item={item} />
                    ))}
                </ul>
            </div>
            <CartSummary items={cartItems} />
        </section>
    );
}

export default Cart;