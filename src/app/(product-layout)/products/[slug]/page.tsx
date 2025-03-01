import { notFound } from "next/navigation";
import { ProductDetailDto } from "@/features/products/details/domain/dto/product-detail.dto";
import ProductDetails from "@/features/products/details/presentation/ProductDetails";
import container from "@/container";
import { IProductDetailService } from "@/features/products/details/domain/services/product-detail.service.interface";
import { TYPES } from "@/types";

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
    const service = container.get<IProductDetailService>(TYPES.IProductDetailService);
  
    const product: ProductDetailDto | null = await service.execute(params.slug);

    if (!product) { 
        notFound();
    }

    return <ProductDetails product={product as ProductDetailDto} />;
}

export default ProductDetailPage;