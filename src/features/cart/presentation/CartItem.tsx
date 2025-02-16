'use cliente';

import { CartItem, removeItem } from '@/store/slices/cart.slice';
import styles from './CartItem.module.css';
import Image from 'next/image';
import QuantitySelector from '@/components/ui/QuantitySelector/QuantitySelector';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ConfirmationModal from '@/components/ui/ConfirmationModal/ConfirmationModal';

const CartItemComponent = ({ item }: { item: CartItem }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemove = () => {
        dispatch(removeItem({ id: item.id }));
        setIsModalOpen(false);
    };

    return (
        <li className={styles.cartItem}>
            <div className={styles.cartItemImage}>
                <Image
                    src={`http://localhost:8080/images/${item.image}`}
                    alt={item.name}
                    width={80}
                    height={80}
                    loading="lazy"
                    className={styles.productImage}
                />
            </div>
            <div className={styles.cartItemDetails}>
                <h2>{item.name}</h2>
                <p><span className={styles.price}>S/. {(item.price * item.quantity).toFixed(2)}</span></p>
                <QuantitySelector id={item.id} quantity={item.quantity} />
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

export default CartItemComponent;
