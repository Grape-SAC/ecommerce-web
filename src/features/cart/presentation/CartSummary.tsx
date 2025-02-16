"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./CartSummary.module.css";
import { CartItem } from "@/store/slices/cart.slice";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const CartSummary = ({ items }: { items: CartItem[] }) => {
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
            <button className={`${styles.returnButton} btn btnPrimaryLight btnFull`} onClick={() => router.back()}>
                <ArrowLeftIcon className={styles.icon}/>
                SEGUIR COMPRANDO
            </button>
            <button className={`${styles.checkoutButton} btn btnPrimary btnFull`} onClick={() => router.push("/checkout")}>
                CONTINUAR CON EL PAGO
            </button>
        </div>
    );
};

export default CartSummary;
