import { ProductImageType } from "./product-image";

export interface ProductDetailType {
    id: number;
    name: string;
    description: string;
    stock: number;
    salePrice: number;
    images: ProductImageType[];
}