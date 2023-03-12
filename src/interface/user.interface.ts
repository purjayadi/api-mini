export interface IPermission {
  action: string;
  resourceId: string;
}

export interface IRole {
  id: string;
  name: string;
  permission: IPermission[];
}

export interface IRolePermission {
  id: string;
  roleId: string;
  permissionId: string;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  employeeId: string;
  isActive: boolean;
  roleId: string;
}
