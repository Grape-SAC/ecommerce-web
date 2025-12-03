'use client';

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import PagoCompraView from "./view/pago-compra.view";
import { ArticuloCarritoType } from "@/app/carrito/types/articulo-carrito.type";
import { useRegistrarPedido } from "./hooks/use-registrar-pedido";
import { vaciarCarrito } from "@/store/slices/carrito.slice";
import { useRouter } from "next/navigation";
import { RegistrarPedidoType } from "./types/registrar-pedido.type";
import { useEffect, useMemo, useState } from "react";

const PagoCompraPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const articulosCarrito: ArticuloCarritoType[] = useSelector((state: RootState) => state.carrito.productos);
    const precioEnvio: number = useSelector((state: RootState) => state.checkout.precioEnvio);
    const usuarioDireccionId: string | null = useSelector((state: RootState) => state.checkout.usuarioDireccionId);

    const [metodoPago, setMetodoPago] = useState('YAPE_PLIN');
    const [archivoComprobante, setArchivoComprobante] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);

    const { execute, loading, error } = useRegistrarPedido();

    const subtotal = useMemo(() => {
        return articulosCarrito.reduce(
            (acum, item) => acum + item.precio * item.cantidad,
            0
        );
    }, [articulosCarrito]);

    const total = useMemo(() => {
        return subtotal + Number(precioEnvio || 0);
    }, [subtotal, precioEnvio]);

    const handleFinishOrder = async (archivoComprobante: File | null, metodoPago: string) => {
        if ((metodoPago === "YAPE_PLIN" || metodoPago === "TRANSFERENCIA") && !archivoComprobante) {
            setClientError("Solo falta subir el comprobante para continuar con tu compra.");
            setDialogOpen(true);
            return;
        }

        const request: RegistrarPedidoType = {
            usuarioDireccionId: usuarioDireccionId!,
            codigoMetodoPago: metodoPago,
            codigoTipoEntrega: 'DOMICILIO',
            costoEnvio: precioEnvio,
            productos: articulosCarrito.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad,
                precio: item.precio
            }))
        };

        const success = await execute(request, archivoComprobante ?? undefined);

        if (success) {
            dispatch(vaciarCarrito());
            router.push('/finalizar-compra/confirmacion');
        }
    };

    useEffect(() => {
        if (error) {
            setDialogOpen(true);
        }
    }, [error]);

    useEffect(() => {
        if (!archivoComprobante) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(archivoComprobante);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [archivoComprobante]);


    return (
        <PagoCompraView
            articulosCarrito={articulosCarrito}
            precioEnvio={precioEnvio}
            subtotal={subtotal}
            total={total}
            loading={loading}
            backendError={error}
            clientError={clientError}
            metodoPago={metodoPago}
            onMetodoPagoChange={setMetodoPago}
            archivoComprobante={archivoComprobante}
            onArchivoComprobanteChange={setArchivoComprobante}
            onFinishOrder={handleFinishOrder}
            dialogOpen={dialogOpen}
            onCloseDialog={() => setDialogOpen(false)}
            previewUrl={previewUrl}
        />
    );
}

export default PagoCompraPage;