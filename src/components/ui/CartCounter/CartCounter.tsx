"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import styles from './CartCounter.module.css';

const CartCounter = () => {
    const totalItems = useSelector((state: RootState) => state.cart.items.length);

    return totalItems > 0 ? (
        <span className={styles.cartItemCount}>{totalItems}</span>
    ) : null;
};

export default CartCounter;
