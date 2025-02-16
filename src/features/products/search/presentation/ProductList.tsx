import React from 'react';
import styles from './ProductList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ProductSummaryDto } from '@/features/products/search/domain/dto/product-summary.dto';
import AddedToCartIndicator from '@/components/ui/AddedToCartIndicator/AddedToCartIndicator';

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

export default ProductList;
