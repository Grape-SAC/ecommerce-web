"use client";

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/store/slices/cart.slice';
import styles from './AddToCartButton.module.css';
import { ProductDetailDto } from '@/features/products/details/domain/dto/product-detail.dto';
import { ProductSummaryDto } from '@/features/products/search/domain/dto/product-summary.dto';
import { RootState } from '@/store';

type AddToCartButtonProps = {
    product: ProductDetailDto | ProductSummaryDto;
    className?: string;
    label?: string;
};

const AddToCartButton = ({ product, className, label = "AGREGAR A MI CARRITO" }: AddToCartButtonProps) => {
    const dispatch = useDispatch();

    // Verificar si el producto ya está en el carrito
    const isInCart = useSelector((state: RootState) =>
        state.cart.items.some((item) => item.id === product.id)
    );

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Detiene la propagación
        event.preventDefault();  // Evita la navegación si el botón está dentro de <Link>

        if (!isInCart) {
            dispatch(addItem({
                id: product.id,
                name: product.name,
                price: product.salePrice,
                quantity: 1
            }));
        }
    };

    return (
        <button className={`${styles.btnAddToCartButton} ${isInCart ? "btnAccent" : "btnPrimary"} btnFull ${className || ''}`} onClick={handleAddToCart}>
            {isInCart ? "AGREGADO" : label}
        </button>
    );
};

export default AddToCartButton;
