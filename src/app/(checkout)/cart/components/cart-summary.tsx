"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./cart-summary.module.css";
import { CartItemType } from "../types/cart-item";
import { Button } from "@mui/material";

const CartSummaryView = ({ items }: { items: CartItemType[] }) => {
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
                sx={{ mb: 1, backgroundColor: "primary.light", color: "primary.main" }}
                fullWidth
                onClick={() => router.back()}
            >
                REGRESAR
            </Button>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => router.push("/checkout/identification")}
            >
                CONTINUAR CON EL PAGO
            </Button>
        </div>
    );
};

export default CartSummaryView;
