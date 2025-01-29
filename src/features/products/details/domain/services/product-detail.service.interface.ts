import { ProductDetailDto } from "../dto/product-detail.dto";

export interface IProductDetailService {
    execute(query: string): Promise<ProductDetailDto | null>;
}