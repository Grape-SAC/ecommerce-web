import { notFound } from "next/navigation";
import { DetalleProductoType } from "./types/detalle-producto.type";
import { obtenerDetalleProducto } from "./services/obtener-detalle-producto.service";
import DetalleProductoView from "./view/detalle-producto.view";

export default async function DetalleProductoPage({ params, }: { params: Promise<{ slug: string }>; }) {
    const { slug } = await params;

    const producto: DetalleProductoType | null = await obtenerDetalleProducto(slug);

    if (!producto) {
        notFound();
    }

    return (
        <div style={{ padding: '16px' }}>
            <DetalleProductoView producto={producto} />
        </div>
    );
}
