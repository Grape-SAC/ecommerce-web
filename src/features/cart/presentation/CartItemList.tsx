import { CartItem } from "@/store/slices/cart.slice";
import CartItemComponent from "./CartItem";


const CartItemList = ({ items }: { items: CartItem[] }) => {
    return (
        <ul>
            {items.map(item => (
                <CartItemComponent key={item.id} item={item} />
            ))}
        </ul>
    );
};

export default CartItemList;