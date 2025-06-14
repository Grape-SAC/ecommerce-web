"use client";

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/app/(checkout)/cart/slices/cart.slice';
import styles from './AddToCartButton.module.css';
import { ProductDetailType } from '@/app/(product)/products/[slug]/types/product-detail';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation'; // Para navegación

const AddToCartButton = ({ product }: {product: ProductDetailType}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const isInCart = useSelector((state: RootState) =>
        state.cart.items.some((item) => item.id === product.id)
    );

    const handleAddToCart = () => {
        if (!isInCart) {
            dispatch(addItem({
                id: product.id,
                image: product.images.length == 0 ? "" : product.images[0].name,
                name: product.name,
                price: product.salePrice,
                quantity: 1
            }));
        }

        router.push('/cart');
    };

    return (
        <button className={`${styles.btnAddToCartButton} ${isInCart ? "btnAccent" : "btnPrimary"} btnFull`} onClick={handleAddToCart}>
            {isInCart ? "AGREGADO" : "AGREGAR A MI CARRITO"}
        </button>
    );
};

export default AddToCartButton;
