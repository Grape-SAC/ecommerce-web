import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { PedidoListaDto } from "../types/pedido-lista.dto";
import { cookies } from "next/headers";

export async function listarPedidos(): Promise<PedidoListaDto[]> {
    const cookieHeader = cookies().toString();

    const response: Response = await fetch(`${config.apiBaseUrlServer}/pedidos`, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader,
        }
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<PedidoListaDto[]> = await response.json();

            return apiResponse.data as PedidoListaDto[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}