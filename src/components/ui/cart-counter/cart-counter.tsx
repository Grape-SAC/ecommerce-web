"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import styles from './cart-counter.module.css';

const CartCounter = () => {
    const totalItems = useSelector((state: RootState) => state.carrito.productos.length);

    return totalItems > 0 ? (
        <span className={styles.cartItemCount}>{totalItems}</span>
    ) : null;
};

export default CartCounter;
