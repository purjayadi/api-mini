declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        id: string;
    }): Promise<{
        id: string;
    }>;
}
export {};