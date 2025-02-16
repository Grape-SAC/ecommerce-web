'use client';

import React from 'react';
import styles from './QuantitySelector.module.css';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '@/store/slices/cart.slice';

const QuantitySelector: React.FC<{ id: number; quantity: number }> = ({ id, quantity }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: Math.max(1, quantity - 1) }));
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
