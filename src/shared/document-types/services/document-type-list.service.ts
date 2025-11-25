import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { TipoDocumentoListaType } from "@/shared/document-types/types/tipo-documento-lista.type";

export async function listarTiposDocumento(): Promise<TipoDocumentoListaType[]> {
    const response: Response = await fetch(`${config.apiBaseUrlPublic}/tipos-documento`, {
        headers: {
            // Este header es la clave para saltar la pantalla de advertencia de Ngrok
            'ngrok-skip-browser-warning': 'true'
        }
    });

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<TipoDocumentoListaType[]> = await response.json();

            return apiResponse.data as TipoDocumentoListaType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}