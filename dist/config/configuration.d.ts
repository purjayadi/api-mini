export declare const configuration: () => {
    NODE_ENV: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        env: string;
    };
    hostname: string;
};
