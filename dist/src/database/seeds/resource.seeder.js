"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolePermission_entity_1 = require("./../../user/entities/rolePermission.entity");
const role_entity_1 = require("./../../user/entities/role.entity");
const user_entity_1 = require("./../../user/entities/user.entity");
const permission_entity_1 = require("./../../user/entities/permission.entity");
const resource_entity_1 = require("./../../user/entities/resource.entity");
class ResourceSeeder {
    async run(dataSource) {
        const repository = dataSource.getRepository(resource_entity_1.Resource);
        const permission = dataSource.getRepository(permission_entity_1.Permission);
        const role = dataSource.getRepository(role_entity_1.Role);
        const rolePermission = dataSource.getRepository(rolePermission_entity_1.RolePermission);
        const user = dataSource.getRepository(user_entity_1.User);
        await repository.insert([
            {
                name: 'User',
            },
            {
                name: 'Employee',
            },
            {
                name: 'Role',
            },
            {
                name: 'Order',
            },
            {
                name: 'Product',
            },
            {
                name: 'Purchase',
            },
            {
                name: 'Retur',
            },
            {
                name: 'Schedule',
            },
            {
                name: 'Stock',
            },
            {
                name: 'Supplier',
            },
            {
                name: 'Warehouse',
            },
            {
                name: 'Customer',
            },
            {
                name: 'Accounting',
            },
            {
                name: 'Unit',
            },
            {
                name: 'Piutang',
            },
            {
                name: 'Payment',
            },
        ]);
        const actions = [
            {
                name: 'create',
            },
            {
                name: 'read',
            },
            {
                name: 'update',
            },
            {
                name: 'delete',
            },
        ];
        const resources = await repository.find();
        actions.map((action) => {
            resources.map((resource) => {
                permission.save({
                    action: action.name,
                    resource,
                });
            });
        });
        await role.save({
            name: 'administrator',
        });
        const roles = await role.find();
        const permissions = await permission.find();
        roles.map((role) => {
            permissions.map((permission) => {
                rolePermission.save({
                    roleId: role.id,
                    permissionId: permission.id,
                });
            });
            user.save(user.create({
                roleId: role.id,
                username: 'admin',
                password: 'admin',
            }));
        });
    }
}
exports.default = ResourceSeeder;
//# sourceMappingURL=resource.seeder.js.map