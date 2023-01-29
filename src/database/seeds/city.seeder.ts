import { City } from '../../address/entities/city.entity';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class CitySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(City);
    await repository.insert([
      {
        id: 261,
        name: 'MATARAM',
        provinceId: 18,
      },
      {
        id: 262,
        name: 'DOMPU',
        provinceId: 18,
      },
      {
        id: 263,
        name: 'SUMBAWA BARAT',
        provinceId: 18,
      },
      {
        id: 264,
        name: 'SUMBAWA',
        provinceId: 18,
      },
      {
        id: 265,
        name: 'LOMBOK TENGAH',
        provinceId: 18,
      },
      {
        id: 266,
        name: 'LOMBOK TIMUR',
        provinceId: 18,
      },
      {
        id: 267,
        name: 'LOMBOK UTARA',
        provinceId: 18,
      },
      {
        id: 268,
        name: 'LOMBOK BARAT',
        provinceId: 18,
      },
      {
        id: 269,
        name: 'BIMA',
        provinceId: 18,
      },
    ]);
  }
}
