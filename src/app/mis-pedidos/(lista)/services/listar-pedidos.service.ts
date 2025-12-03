import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { PedidoListaDto } from "../types/pedido-lista.dto";
import { cookies } from "next/headers";
import { ApiResponseError } from "@/shared/types/api-response-error";

export async function listarPedidos(): Promise<PedidoListaDto[]> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map(c => `${c.name}=${c.value}`)
        .join("; ");

    const responseHttp: Response = await fetch(`${config.apiBaseUrlServer}/pedidos`, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader,
        }
    });

    switch (responseHttp.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<PedidoListaDto[]> = await responseHttp.json();

            return apiResponse.data as PedidoListaDto[];
        }
        case HttpStatus.UNAUTHORIZED: {
            const apiResponse: ApiResponseError = await responseHttp.json();

            throw apiResponse;
        }
        default: {
            const apiResponse: ApiResponseError = {
                message: 'Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.',
                status: 'error',
                code: 500
            };

            throw apiResponse;
        }
    }
}