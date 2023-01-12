"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeProviders = void 0;
const employee_entity_1 = require("./entities/employee.entity");
exports.employeeProviders = [
    {
        provide: 'EMPLOYEE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(employee_entity_1.Employee),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=employee.provider.js.map