import { ProductSummaryDto } from '@/app/search/product-summary-dto';
import React from 'react';
import styles from './ProductList.module.css';
import Image from 'next/image';

const ProductList = ({ products }: { products: ProductSummaryDto[] }) => (
    <ul className={styles.productList}>
        {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
                <article className={styles.productCard}>                    
                    <Image 
                        src={`http://localhost:8080/images/product_1.webp`}
                        alt={product.name}
                        width={300}
                        height={300}
                        loading="lazy"
                        className={styles.productImage}
                    />
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>S/. {product.sale_price}</p>
                    <button className={styles.btnAddToCart} aria-label={`Agregar ${product.name} al carrito`}>
                        AGREGAR
                    </button>
                </article>
            </li>
        ))}
    </ul>
);

export default ProductList;
