
import ArticuloCarrito from '../components/articulo-carrito';
import CarritoVacio from '../components/carrito-vacio';
import ResumenCarrito from '../components/resumen-carrito';
import { ArticuloCarritoType } from '../types/articulo-carrito.type';
import styles from './carrito.module.css';

const CarritoView = ({ articulosCarrito }: { articulosCarrito: ArticuloCarritoType[] }) => {
    if (articulosCarrito.length === 0) {
        return <CarritoVacio />;
    }

    return (
        <section className={styles.cartContainer}>

            <div className={styles.cartItems}>
                <ul>
                    {articulosCarrito.map((item) => (
                        <ArticuloCarrito key={item.id} item={item} />
                    ))}
                </ul>
            </div>

            <ResumenCarrito articulos={articulosCarrito} />
        </section>
    );
};

export default CarritoView;
