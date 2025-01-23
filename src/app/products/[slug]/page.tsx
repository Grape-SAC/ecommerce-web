import { notFound } from "next/navigation";
import { ProductDetailDto } from "../product-detail.dto";
import { getProductDetail } from "../service";
import ProductDetails from "./ProductDetails";

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
    const product: ProductDetailDto | null = await getProductDetail(params.slug);
  
    if (!product) { 
        notFound();
    }

    return <ProductDetails product={product as ProductDetailDto} />;
}

export default ProductDetailPage;