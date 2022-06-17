import { Resource } from './../../user/entities/resource.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class ResourceSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Resource);
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

    const resourceFactory = factoryManager.get(Resource);
    // save 1 factory generated entity, to the database
    await resourceFactory.save();
  }
}
