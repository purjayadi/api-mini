import { SubDistrict } from './../../address/entities/subDistrict.entity';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import subDistrict from './subDistrict.json';

export default class SubDistrictSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(SubDistrict);
    await repository.save(subDistrict, { chunk: subDistrict.length / 1000 });
  }
}
