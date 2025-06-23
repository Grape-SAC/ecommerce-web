'use client';

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import PaymentView from "./view/payment.view";
import { CartItemType } from "@/app/cart/types/cart-item.type";

const PayPage = () => {
    const cartItems: CartItemType[] = useSelector((state: RootState) => state.cart.items);

    return (
        <PaymentView cartItems={cartItems} />
    );
}

export default PayPage;