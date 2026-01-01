"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./resumen-carrito.module.css";
import { Button } from "@mui/material";
import { ArticuloCarritoType } from "../types/articulo-carrito.type";
import { LoadingPage } from "@/components/ui/loading-page/loading-page";

const ResumenCarrito = ({ articulos }: { articulos: ArticuloCarritoType[] }) => {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    // Calcular el total del carrito
    const total = useMemo(() => {
        return articulos.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
    }, [articulos]);

    return (
        <div className={styles.summaryContainer}>
            {isNavigating && <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />}

            <p className={styles.totalContainer}>
                Total
                <span>S/.{total.toFixed(2)}</span>
            </p>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                    setIsNavigating(true)

                    router.push("/finalizar-compra/identificacion");
                }}
            >
                CONTINUAR CON EL PAGO
            </Button>
        </div>
    );
};

export default ResumenCarrito;
