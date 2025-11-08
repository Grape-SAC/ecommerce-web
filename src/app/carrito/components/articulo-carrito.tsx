'use cliente';

import { eliminarProducto } from '@/store/slices/carrito.slice';
import styles from './articulo-carrito.module.css';
import Image from 'next/image';
import QuantitySelector from '@/components/ui/quantity-selector/quantity-selector';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ConfirmationModal from '@/components/ui/confirmation-modal/confirmation-modal';
import { ArticuloCarritoType } from '../types/articulo-carrito.type';

const ArticuloCarrito = ({ item }: { item: ArticuloCarritoType }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemove = () => {
        dispatch(eliminarProducto({ id: item.id }));
        setIsModalOpen(false);
    };

    return (
        <li className={styles.cartItem}>
            <div className={styles.cartItemImage}>
                <Image
                    src={`http://localhost:8080/imagenes/${item.imagen}`}
                    alt={item.nombre}
                    width={80}
                    height={80}
                    loading="lazy"
                    className={styles.productImage}
                />
            </div>
            <div className={styles.cartItemDetails}>
                <h2>{item.nombre}</h2>
                <p><span className={styles.price}>S/. {(item.precio * item.cantidad).toFixed(2)}</span></p>
                <QuantitySelector id={item.id} quantity={item.cantidad} />
            </div>
            <div className={styles.removeButton}>
                <button onClick={() => setIsModalOpen(true)}><TrashIcon className={styles.icon} /></button>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleRemove}
                    message="¿Estás seguro de quitar este producto de tu carrito?"
                />
            </div>
        </li>
    );
};

export default ArticuloCarrito;
