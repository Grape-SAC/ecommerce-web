"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CartItem } from '@/store/slices/cart.slice';
import Cart from '@/features/cart/presentation/Cart';

const CartPage = () => {
    const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);

    return (
        <Cart cartItems={cartItems} />
    );
};

export default CartPage;
