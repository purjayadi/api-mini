import { District } from './../../address/entities/district.entity';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import district from './district.json';

export default class DistrictSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(District);
    await repository.save(district, { chunk: district.length / 1000 });
  }
}
