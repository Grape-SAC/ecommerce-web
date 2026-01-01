'use client';

import { useDispatch, useSelector } from 'react-redux';
import CarruselProductoView from '../components/carrusel-producto';
import { DetalleProductoType } from '../types/detalle-producto.type';
import styles from './detalle-producto.module.css';
import AgregarCarritoButton from '@/components/ui/add-to-cart-button/agregar-carrito-button';
import { RootState } from '@/store';
import { toggleFavorito } from '@/store/slices/favoritos.slice';

const DetalleProductoView = ({ producto }: { producto: DetalleProductoType }) => {
    const dispatch = useDispatch();
    const favoritos = useSelector(
        (state: RootState) => state.favoritos.productosIds
    );

    const isFavorite = favoritos.includes(producto.id);

    const formatearDescripcion = (texto: string) => {
        return texto.split('\n').map((linea, indice) => (
            <span key={indice}>
                {linea}
                <br />
            </span>
        ));
    };

    return (
        <section>
            <CarruselProductoView
                imagenes={producto.imagenes}
                isFavorite={isFavorite}
                onToggleFavorite={() => dispatch(toggleFavorito(producto.id))}
            />
            <h1 className={styles.titulo}>{producto.nombre}</h1>
            <p className={styles.precioProducto}>
                <data value={`${producto.precioVenta}`}>S/.{producto.precioVenta}</data>
            </p>
            <AgregarCarritoButton producto={producto} />
            <p className={styles.textoDescripcion}>{formatearDescripcion(producto.descripcion)}</p>
        </section>
    );
};

export default DetalleProductoView;
