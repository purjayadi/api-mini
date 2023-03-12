import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
export default class DistrictSeeder implements Seeder {
    run(dataSource: DataSource): Promise<any>;
}
