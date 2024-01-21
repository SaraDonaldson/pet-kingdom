
'use client';
import React, { useState } from 'react';
import styles from './MiniCart.module.css';

interface Item {
  id: number;
  name: string;
  price: number;
}

interface MiniCartProps {
  items: Item[]; 
}

const MiniCart: React.FC<MiniCartProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className={isOpen ? `${styles.miniCart} ${styles.open}` : styles.miniCart}>
      <div className={styles.cartTab} onClick={toggleCart}>
        Cart ({items.length})
      </div>
      <div className={styles.cartContent}>
        {items.map(item => (
          <div key={item.id} className={styles.cartItem}>
            {item.name} - ${item.price}
          </div>
        ))}
        <div className={styles.totalPrice}>Total: ${totalPrice}</div>
      </div>
    </div>
  );
};

export default MiniCart;
