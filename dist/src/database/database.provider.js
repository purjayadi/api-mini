"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService) => {
            const options = {
                type: 'mysql',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.database'),
                logging: configService.get('database.env') !== 'development',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: configService.get('database.env') === 'development',
            };
            const dataSource = new typeorm_1.DataSource(options);
            const source = await dataSource.initialize();
            return source;
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=database.provider.js.map