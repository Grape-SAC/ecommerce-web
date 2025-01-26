import { notFound } from "next/navigation";
import { getProductDetail } from "@/features/products/details/application/product-detail.service";
import { ProductDetailDto } from "@/features/products/details/domain/product-detail.dto";
import ProductDetails from "@/features/products/details/presentation/ProductDetails";

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
    const product: ProductDetailDto | null = await getProductDetail(params.slug);
  
    if (!product) { 
        notFound();
    }

    return <ProductDetails product={product as ProductDetailDto} />;
}

export default ProductDetailPage;