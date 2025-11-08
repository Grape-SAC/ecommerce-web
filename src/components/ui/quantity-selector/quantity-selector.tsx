'use client';

import React from 'react';
import styles from './quantity-selector.module.css';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { actualizarCantidad } from '@/store/slices/carrito.slice';

const QuantitySelector: React.FC<{ id: string; quantity: number }> = ({ id, quantity }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(actualizarCantidad({ id, cantidad: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(actualizarCantidad({ id, cantidad: Math.max(1, quantity - 1) }));
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleDecrease} className={styles.button}><MinusIcon className={styles.icon} /></button>
      <span className={styles.quantity}>{quantity}</span>
      <button onClick={handleIncrease} className={styles.button}><PlusIcon className={styles.icon} /></button>
    </div>
  );
};

export default QuantitySelector;
