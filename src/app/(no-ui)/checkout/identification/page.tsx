'use client'

import CheckoutIdentificationView from "./view/checkout-identification.view";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthUserResponseType } from "../../auth/register/types/auth-user-response.type";

const CheckoutIdentificationPage = () => {
    const authUser: AuthUserResponseType | null = useSelector((state: RootState) => state.auth.user);

    return (
        <CheckoutIdentificationView authUser={authUser} />
    );
}

export default CheckoutIdentificationPage;