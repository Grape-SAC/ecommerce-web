"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./cart-summary.module.css";
import { CartItemType } from "../types/cart-item.type";
import { Button } from "@mui/material";
import NProgress from 'nprogress';

const CartSummary = ({ items }: { items: CartItemType[] }) => {
    const router = useRouter();    

    // Calcular el total del carrito
    const total = useMemo(() => {
        return items.reduce((acumulado, item) => acumulado + item.price * item.quantity, 0);
    }, [items]);

    return (
        <div className={styles.summaryContainer}>
            <p className={styles.totalContainer}>
                Total
                <span>S/.{total.toFixed(2)}</span>
            </p>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                    NProgress.start();

                    router.push("/checkout/identification");
                }}
            >
                CONTINUAR CON EL PAGO
            </Button>
        </div>
    );
};

export default CartSummary;
