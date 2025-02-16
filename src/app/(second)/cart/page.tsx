"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CartItemList from '@/features/cart/presentation/CartItemList';
import styles from './Cart.module.css';
import CartSummary from '@/features/cart/presentation/CartSummary';

const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    if (cartItems.length === 0) {
        return <p>El carrito está vacío.</p>;
    }

    return (
        <section className={styles.cartContainer}>
            <h1 className={styles.title}>Mi Carrito</h1>
            <div className={styles.cartItems}>
                <CartItemList items={cartItems} />
            </div>
            <CartSummary items={cartItems} />
        </section>
    );
};

export default CartPage;
