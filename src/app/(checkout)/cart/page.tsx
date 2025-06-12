"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CartView from './components/cart';
import { CartItemType } from './types/cart-item';

const CartPage = () => {
    const cartItems: CartItemType[] = useSelector((state: RootState) => state.cart.items);

    return (
        <CartView cartItems={cartItems} />
    );
};

export default CartPage;
