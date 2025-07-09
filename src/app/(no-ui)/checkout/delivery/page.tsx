import { listAllUserAddresses } from "../../account/address/services/addresses-list.service";
import { UserAddressListType } from "../../account/address/types/user-address-list.type";
import CheckoutDeliveryView from "./view/checkout-delivery.view";

const CheckoutDeliveryPage = async () => {
    const userAddressListDto: UserAddressListType[] = await listAllUserAddresses();

    return (
        <CheckoutDeliveryView userAddresses={userAddressListDto} />
    );
}

export default CheckoutDeliveryPage;