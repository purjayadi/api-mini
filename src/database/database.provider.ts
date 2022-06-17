import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import resourceFactory from './factories/resource.factory';
import ResourceSeeder from './seeds/resource.seeder';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const options: DataSourceOptions & SeederOptions = {
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: process.env.APP_ENV === 'development',
        synchronize: process.env.APP_ENV === 'development',
        seeds: [ResourceSeeder],
        factories: [resourceFactory],
      };
      const dataSource = new DataSource(options);
      const source = await dataSource.initialize();
      await runSeeders(dataSource);
      return source;
    },
  },
];
