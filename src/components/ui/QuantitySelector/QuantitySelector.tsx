'use client'; // Importante para habilitar el uso de hooks del cliente

import React, { useState } from 'react';
import styles from './QuantitySelector.module.css';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const QuantitySelector: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1)); // Evitar valores menores a 1
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
