import { ProductDetailDto } from "../dto/product-detail.dto";

export interface IProductDetailRepository {
    getProductDetail(slug: string): Promise<ProductDetailDto | null>;
}