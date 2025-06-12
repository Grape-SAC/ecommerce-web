"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./AddedToCartIndicator.module.css";

type AddedToCartIndicatorProps = {
    productId: number;
};

const AddedToCartIndicator = ({ productId }: AddedToCartIndicatorProps) => {
    const isInCart = useSelector((state: RootState) =>
        state.cart.items.some((item) => item.id === productId)
    );

    if (!isInCart) return null;

    return <span className={styles.indicator}>Agregado</span>;
};

export default AddedToCartIndicator;
