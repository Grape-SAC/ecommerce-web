'use client';

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CartItemType } from "../../cart/types/cart-item";
import PayView from "./components/pay";

const PayPage = () => {
    const cartItems: CartItemType[] = useSelector((state: RootState) => state.cart.items);

    return (
        <PayView cartItems={cartItems} />
    );
}

export default PayPage;