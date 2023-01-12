import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
export default class ResourceSeeder implements Seeder {
    run(dataSource: DataSource): Promise<any>;
}
