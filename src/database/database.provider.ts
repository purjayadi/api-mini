import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

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
        seeds: ['./seeds/**/*{.ts,.js}'],
        factories: ['./factories/**/*{.ts,.js}'],
      };
      const dataSource = new DataSource(options);
      return dataSource.initialize();
    },
  },
];
