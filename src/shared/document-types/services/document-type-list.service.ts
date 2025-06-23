import { HttpStatus } from "@/shared/enum/http-status";
import config from "@/config/config";
import { ApiResponseOK } from "@/shared/types/api-response-ok";
import { DocumentTypeListType } from "@/shared/document-types/types/document-type-list.type";

export async function findAllDocumentTypes(): Promise<DocumentTypeListType[]> {
    const response: Response = await fetch(`${config.apiBaseUrl}/document-types`);

    switch (response.status) {
        case HttpStatus.OK: {
            const apiResponse: ApiResponseOK<DocumentTypeListType[]> = await response.json();

            return apiResponse.data as DocumentTypeListType[];
        }
        default:
            throw new Error('Algo salió mal. Estamos trabajando para solucionar el problema. Por favor, inténtalo de nuevo más tarde.');
    }
}