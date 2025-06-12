import { notFound } from "next/navigation";
import { getProductDetail } from "./services/product-detail-service";
import { ProductDetailType } from "./types/product-detail";
import ProductDetailView from "./components/product-detail";

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {  
    const product: ProductDetailType | null = await getProductDetail(params.slug);

    if (!product) { 
        notFound();
    }

    return <ProductDetailView product={product as ProductDetailType} />;
}

export default ProductDetailPage;