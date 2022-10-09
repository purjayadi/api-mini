import { ConfigService } from '@nestjs/config';
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
    useFactory: async (configService: ConfigService) => {
      const options: DataSourceOptions & SeederOptions = {
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password') as any,
        database: configService.get('database.database'),
        logging: configService.get('database.env') !== 'development',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // logging: process.env.APP_ENV === 'development',
        // synchronize: configService.get('database.env') === 'development',
        // seeds: [ResourceSeeder, CitySeeder, DistrictSeeder, SubDistrictSeeder],
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
      // process.env.APP_ENV === 'development' && (await runSeeders(dataSource));
      return source;
    },
    inject: [ConfigService],
  },
];
