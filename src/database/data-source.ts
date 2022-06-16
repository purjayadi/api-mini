import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'myPassword',
  database: 'postgres',
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
