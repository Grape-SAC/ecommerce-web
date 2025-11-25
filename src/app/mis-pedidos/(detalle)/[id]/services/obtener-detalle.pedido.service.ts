import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { cookies } from "next/headers";
import { DetallePedidoType } from "../types/detalle-pedido.type";

export async function obtenerDetallePedido(pedidoId: string): Promise<DetallePedidoType> {
    const cookieHeader = cookies().toString();

    const response: Response = await fetch(`${config.apiBaseUrlServer}/pedidos/${pedidoId}`, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader,
        }
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<DetallePedidoType> = await response.json();

            return apiResponse.data as DetallePedidoType;
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}