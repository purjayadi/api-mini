import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
export default class CitySeeder implements Seeder {
    run(dataSource: DataSource): Promise<any>;
}
