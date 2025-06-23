export interface ApiResponseOK<T> {
    status: string;
    code: number;
    message: string;
    data?: T;
}