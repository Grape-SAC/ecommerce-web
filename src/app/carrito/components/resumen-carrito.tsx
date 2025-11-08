"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./resumen-carrito.module.css";
import { Button } from "@mui/material";
import NProgress from 'nprogress';
import { ArticuloCarritoType } from "../types/articulo-carrito.type";

const ResumenCarrito = ({ articulos }: { articulos: ArticuloCarritoType[] }) => {
    const router = useRouter();    

    // Calcular el total del carrito
    const total = useMemo(() => {
        return articulos.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
    }, [articulos]);

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

                    router.push("/finalizar-compra/identificacion");
                }}
            >
                CONTINUAR CON EL PAGO
            </Button>
        </div>
    );
};

export default ResumenCarrito;
