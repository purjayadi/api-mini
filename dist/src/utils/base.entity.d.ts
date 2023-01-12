import { BaseEntity } from 'typeorm';
export declare abstract class BaseColumn extends BaseEntity {
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    version: number;
}
