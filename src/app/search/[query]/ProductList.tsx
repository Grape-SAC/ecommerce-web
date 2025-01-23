import { ProductSummaryDto } from '@/app/search/product-summary.dto';
import React from 'react';
import styles from './ProductList.module.css';
import Image from 'next/image';
import Link from 'next/link';

const ProductList = ({ products }: { products: ProductSummaryDto[] }) => (
    <ul className={styles.productList}>
        {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
                <Link href={`/products/${product.slug}`}>
                    <article className={styles.productCard}>
                        <Image
                            src={`http://localhost:8080/images/${product.imageMain}`}
                            alt={product.name}
                            width={300}
                            height={300}
                            loading="lazy"
                            className={styles.productImage}
                        />
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productPrice}>S/. {product.salePrice}</p>
                        <button className={styles.btnAddToCart} aria-label={`Agregar ${product.name} al carrito`}>
                            AGREGAR
                        </button>
                    </article>
                </Link>
            </li>
        ))}
    </ul>
);

export default ProductList;
