'use client';

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import PagoCompraView from "./view/pago-compra.view";
import { ArticuloCarritoType } from "@/app/carrito/types/articulo-carrito.type";

const PagoCompraPage = () => {
    const articulosCarrito: ArticuloCarritoType[] = useSelector((state: RootState) => state.carrito.productos);
    const precioEnvio = useSelector((state: RootState) => state.checkout.precioEnvio);
    const usuarioDireccionId = useSelector((state: RootState) => state.checkout.usuarioDireccionId);

    return (
        <PagoCompraView
            articulosCarrito={articulosCarrito}
            precioEnvio={precioEnvio}
            usuarioDireccionId={usuarioDireccionId} />
    );
}

export default PagoCompraPage;