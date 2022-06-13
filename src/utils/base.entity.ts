import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export abstract class BaseColumn extends BaseEntity {

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date | null;

    @DeleteDateColumn()
    deletedAt: Date | null

    @VersionColumn({
        default: 1,
    })
    version: number;

}