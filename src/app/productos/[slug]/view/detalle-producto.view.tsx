import CarruselProductoView from '../components/carrusel-producto';
import { DetalleProductoType } from '../types/detalle-producto.type';
import styles from './detalle-producto.module.css';
import AgregarCarritoButton from '@/components/ui/add-to-cart-button/agregar-carrito-button';

const DetalleProductoView = ({ producto }: { producto: DetalleProductoType }) => {
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
            <CarruselProductoView imagenes={producto.imagenes} />
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
