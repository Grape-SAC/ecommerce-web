import { ProductImageDto } from "./product-image.dto";


export interface ProductDetailDto {
    id: number;
    name: string;
    description: string;
    stock: number;
    salePrice: number;
    images: ProductImageDto[];
}