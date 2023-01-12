export declare const randomNumber: (min: number, max: number) => number;
export declare const hash: (password: string) => Promise<string>;
export declare function paginateResponse(data: any, page: number, limit: number, error: string[], status: number, optional?: any): {
    status: number;
    error: string[];
    data: any[];
    meta: {
        totalItems: any;
        currentPage: number;
        nextPage: number;
        prevPage: number;
        lastPage: number;
    };
    optional: any;
};
