import { ProductDetailDto } from "@/features/products/details/domain/dto/product-detail.dto";
import { injectable } from "inversify";
import { IProductDetailService } from "../domain/services/product-detail.service.interface";
import { inject } from "inversify";
import { TYPES } from "@/types";
import type { IProductDetailRepository } from "../domain/repositories/product-detail.repository.interface";
@injectable()
export class ProductDetailService implements IProductDetailService {
    constructor(
        @inject(TYPES.IProductDetailRepository) 
        private readonly repository: IProductDetailRepository
    ) {}

    async execute(slug: string): Promise<ProductDetailDto | null> {
        return this.repository.getProductDetail(slug);
    }
}