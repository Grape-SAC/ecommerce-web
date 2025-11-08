
import ArticuloCarrito from '../components/articulo-carrito';
import ResumenCarrito from '../components/resumen-carrito';
import { ArticuloCarritoType } from '../types/articulo-carrito.type';
import styles from './carrito.module.css';
import PageHeader from '@/components/ui/page-header/page-header';

const CarritoView = ({ articulosCarrito }: { articulosCarrito: ArticuloCarritoType[] }) => {
    if (articulosCarrito.length === 0) {
        return <p>El carrito está vacío.</p>;
    }

    return (
        <section className={styles.cartContainer}>
            <PageHeader title="Mi Carrito" backHref="/" />

            <div className={styles.articulosCarrito}>
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
