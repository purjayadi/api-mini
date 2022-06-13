export interface IResponse {
    status: number;
    error: string[];
    data?: any;
    message?: string;
    access_token?: string;
}