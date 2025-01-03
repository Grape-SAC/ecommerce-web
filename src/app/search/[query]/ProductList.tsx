import { ProductSummaryDto } from '@/app/search/product-summary-dto';
import React from 'react';

const ProductList = ({ products }: { products: ProductSummaryDto[] }) => (
    <ul>
        {products.map((product) => (
            <li key={product.id}>{product.name}</li>
        ))}
    </ul>
);

export default ProductList;
