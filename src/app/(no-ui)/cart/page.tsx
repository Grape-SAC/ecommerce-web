"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CartView from './view/cart.view';
import { CartItemType } from './types/cart-item.type';

const CartPage = () => {
    const cartItems: CartItemType[] = useSelector((state: RootState) => state.cart.items);

    return (
        <CartView cartItems={cartItems} />
    );
};

export default CartPage;
