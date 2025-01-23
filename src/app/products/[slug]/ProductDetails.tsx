import React from 'react';
import { ProductDetailDto } from '../product-detail.dto';
import ProductCarousel from './ProductCarousel';

const ProductDetails = ({ product }: { product: ProductDetailDto }) => (
    <section>        
        <ProductCarousel images={product.images} />
        <h1>{product.name}</h1>
    </section>
);

export default ProductDetails;
