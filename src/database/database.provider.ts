import { DataSource, DataSourceOptions } from 'typeorm';
import {
  createDatabase,
  dropDatabase,
  runSeeders,
  SeederOptions,
} from 'typeorm-extension';
import CitySeeder from './seeds/city.seeder';
import DistrictSeeder from './seeds/district.seeder';
import ResourceSeeder from './seeds/resource.seeder';
import SubDistrictSeeder from './seeds/subDistrict.seeder';

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
        // logging: process.env.APP_ENV === 'development',
        synchronize: process.env.APP_ENV === 'development',
        seeds: [ResourceSeeder, CitySeeder, DistrictSeeder, SubDistrictSeeder],
        factories: [],
      };
      // if (process.env.APP_ENV === 'development') {
      //   await dropDatabase({
      //     options: options as DataSourceOptions,
      //     ifExist: true,
      //   });
      //   await createDatabase({
      //     options: options as DataSourceOptions,
      //     ifNotExist: true,
      //   });
      // }
      const dataSource = new DataSource(options);
      const source = await dataSource.initialize();
      // await runSeeders(dataSource);
      return source;
    },
  },
];
