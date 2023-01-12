export declare class CreateRoleDto {
    readonly name: string;
    readonly permissions: any;
}
export declare class AssignPermission {
    permissions: Permission[];
}
export declare class Permission {
    readonly id: string;
}
