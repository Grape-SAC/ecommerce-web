'use client';

import React from 'react';
import styles from './listar-productos.module.css';
import Image from 'next/image';
import Link from 'next/link';
import IndicadorAgregadoAlCarrito from '@/components/ui/added-to-cart-indicator/added-to-cart-indicator';
import NProgress from 'nprogress';
import { ResumenProductoType } from '../types/resumen-producto.type';

const ListarProductosView = ({ productos }: { productos: ResumenProductoType[] }) => (
    <ul className={styles.productoLista}>
        {productos.map((producto) => (
            <li key={producto.id} className={styles.productoItem}>
                <Link 
                    href={`/productos/${producto.slug}`}
                    onClick={() => {
                        NProgress.start();
                    }}
                >
                    <article className={styles.productoCard}>
                        <Image
                            src={`http://localhost:8080/imagenes/${producto.imagenPrincipal}`}
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
);

export default ListarProductosView;
