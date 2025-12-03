import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { RegistrarPedidoType } from "../types/registrar-pedido.type";

export async function registrarPedido(request: RegistrarPedidoType, archivoComprobante?: File): Promise<ApiResponseOK<void>> {
    const formData = new FormData();

    formData.append("productos", JSON.stringify(request.productos));
    formData.append("usuarioDireccionId", request.usuarioDireccionId);
    formData.append("codigoMetodoPago", request.codigoMetodoPago);
    formData.append("codigoTipoEntrega", request.codigoTipoEntrega);
    formData.append("costoEnvio", String(request.costoEnvio));

    if (archivoComprobante) {
        formData.append("archivoComprobante", archivoComprobante);
    }

    const response: Response = await fetch(`${config.apiBaseUrlPublic}/pedidos`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    switch (response.status) {
        case HttpStatus.CREATED: {
            const apiResponse: ApiResponseOK<void> = await response.json();

            return apiResponse;
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}