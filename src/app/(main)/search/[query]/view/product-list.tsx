'use client';

import React from 'react';
import styles from './product-list.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AddedToCartIndicator from '@/components/ui/added-to-cart-indicator/added-to-cart-indicator';
import NProgress from 'nprogress';
import { ProductSummaryType } from '../types/product-summary.type';

const ProductListView = ({ products }: { products: ProductSummaryType[] }) => (
    <ul className={styles.productList}>
        {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
                <Link 
                    href={`/products/${product.slug}`}
                    onClick={() => {
                        NProgress.start();
                    }}
                >
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
                        <div className={styles.productInfo}>
                            <span className={styles.productPrice}>
                                <data value={`${product.salePrice}`}>S/.{product.salePrice}</data>
                            </span>
                            <AddedToCartIndicator productId={product.id} />
                        </div>
                    </article>
                </Link>
            </li>
        ))}
    </ul>
);

export default ProductListView;
