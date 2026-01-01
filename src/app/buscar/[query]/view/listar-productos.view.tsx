'use client';

import React, { useState } from 'react';
import styles from './listar-productos.module.css';
import Link from 'next/link';
import IndicadorAgregadoAlCarrito from '@/components/ui/added-to-cart-indicator/added-to-cart-indicator';
import { ResumenProductoType } from '../../../../shared/types/resumen-producto.type';
import { LoadingPage } from '@/components/ui/loading-page/loading-page';
import FavoriteButton from '@/components/ui/favorito-button/favorito-button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleFavorito } from '@/store/slices/favoritos.slice';

const ListarProductosView = ({ productos }: { productos: ResumenProductoType[] }) => {
    const [isNavigating, setIsNavigating] = useState(false);
    const dispatch = useDispatch();
    const favoritos = useSelector(
        (state: RootState) => state.favoritos.productosIds
    );

    return (
        <>
            {isNavigating && (
                <LoadingPage sx={{ position: 'fixed', zIndex: 9999 }} />
            )}
            <ul className={styles.productoLista}>
                {productos.map((producto) => (
                    <li key={producto.id} className={styles.productoItem}>
                        <Link
                            href={`/productos/${producto.slug}`}
                            onClick={() => {
                                setIsNavigating(true);
                            }}
                        >
                            <article className={styles.productoCard}>
                                <FavoriteButton
                                    isFavorite={favoritos.includes(producto.id)}
                                    onToggle={() => dispatch(toggleFavorito(producto.id))}
                                />

                                <img
                                    src={producto.imagenPrincipal}
                                    alt={producto.nombre}
                                    width={300}
                                    height={300}
                                    loading="lazy"
                                    className={styles.productoImagen}
                                />
                                <h3 className={styles.productoNombre}>{producto.nombre}</h3>
                                <div className={styles.productoInfo}>
                                    <span className={styles.productoPrecio}>
                                        <data value={`${producto.precioVenta}`}>S/.{producto.precioVenta}</data>
                                    </span>
                                    <IndicadorAgregadoAlCarrito productoId={producto.id} />
                                </div>
                            </article>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListarProductosView;
