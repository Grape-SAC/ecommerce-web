"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ArticuloCarritoType } from './types/articulo-carrito.type';
import CarritoView from './view/carrito.view';

const CartPage = () => {
    const cartItems: ArticuloCarritoType[] = useSelector((state: RootState) => state.carrito.productos);

    return (
        <CarritoView articulosCarrito={cartItems} />
    );
};

export default CartPage;
