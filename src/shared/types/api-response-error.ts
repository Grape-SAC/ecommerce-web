export interface ApiResponseError {
    status: string;
    code: number;
    message: string;
    errors?: string[];
}