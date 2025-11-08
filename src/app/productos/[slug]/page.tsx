import { notFound } from "next/navigation";
import { DetalleProductoType } from "./types/detalle-producto.type";
import { obtenerDetalleProducto } from "./services/producto-detalle-service";
import DetalleProductoView from "./view/detalle-producto.view";

const DetalleProductoPage = async ({ params }: { params: { slug: string } }) => {  
    const producto: DetalleProductoType | null = await obtenerDetalleProducto(params.slug);

    if (!producto) { 
        notFound();
    }

    return <DetalleProductoView producto={producto as DetalleProductoType} />;
}

export default DetalleProductoPage;