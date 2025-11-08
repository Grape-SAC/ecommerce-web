"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./added-to-cart-indicator.module.css";

type IndicadorAgregadoAlCarritoProps = {
    productoId: string;
};

const IndicadorAgregadoAlCarrito = ({ productoId }: IndicadorAgregadoAlCarritoProps) => {
    const estaEnCarrito = useSelector((state: RootState) =>
        state.carrito.productos.some((item) => item.id === productoId)
    );

    if (!estaEnCarrito) return null;

    return <span className={styles.indicator}>Agregado</span>;
};

export default IndicadorAgregadoAlCarrito;
