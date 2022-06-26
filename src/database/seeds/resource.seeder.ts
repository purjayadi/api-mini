import { RolePermission } from './../../user/entities/rolePermission.entity';
import { Role } from './../../user/entities/role.entity';
import { User } from './../../user/entities/user.entity';
import { Permission } from './../../user/entities/permission.entity';
import { Resource } from './../../user/entities/resource.entity';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class ResourceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Resource);
    const permission = dataSource.getRepository(Permission);
    const role = dataSource.getRepository(Role);
    const rolePermission = dataSource.getRepository(RolePermission);
    const user = dataSource.getRepository(User);
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

      user.save(
        user.create({
          roleId: role.id,
          username: 'admin',
          password: 'admin',
        }),
      );
    });
  }
}
