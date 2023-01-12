export interface IPaginate {
    readonly data: any;
    readonly totalItems: number;
    readonly currentPage: number;
    readonly nextPage: string;
    readonly prevPage: string;
    readonly lastPage: number;
}
export interface IResponse {
    status: number;
    error: string[];
    data?: any;
    message?: string;
    access_token?: string;
}
