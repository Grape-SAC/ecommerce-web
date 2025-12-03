"use client";

import { useDispatch, useSelector } from 'react-redux';
import { agregarProducto } from '@/store/slices/carrito.slice';
import styles from './agregar-carrito-button.module.css';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation'; // Para navegación
import { DetalleProductoType } from '@/app/productos/[slug]/types/detalle-producto.type';
import { useState } from 'react';
import { LoadingPage } from '../loading-page/loading-page';

const AgregarCarritoButton = ({ producto }: { producto: DetalleProductoType }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const estaEnCarrito = useSelector((state: RootState) =>
        state.carrito.productos.some((item) => item.id === producto.id)
    );

    const manejarAgregarCarrito = () => {
        setLoading(true);
        if (!estaEnCarrito) {
            dispatch(agregarProducto({
                id: producto.id,
                imagen: producto.imagenes.length == 0 ? "" : producto.imagenes[0].nombre,
                nombre: producto.nombre,
                precio: producto.precioVenta,
                cantidad: 1
            }));
        }

        router.push('/carrito');
    };

    return (
        <>
            {loading && (
                <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />
            )}
            <button className={`${styles.btnAgregarCarrito} ${estaEnCarrito ? "btnAccent" : "btnPrimary"} btnFull`} onClick={manejarAgregarCarrito}>
                {estaEnCarrito ? "AGREGADO" : "AGREGAR A MI CARRITO"}
            </button>
        </>
    );
};

export default AgregarCarritoButton;
