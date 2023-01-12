import { Employee } from './../../employee/entities/employee.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { ScheduleDetail } from './scheduleDetail.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare enum StatusFormat {
    PENDING = "Pending",
    PROCESS = "On Process",
    CANCEL = "Canceled",
    COMPLETE = "Done"
}
export declare class Schedule extends BaseColumn {
    id: string;
    code: string;
    date: Date;
    customerId: string;
    employeeId: string;
    description: string;
    status: StatusFormat;
    scheduleDetails: ScheduleDetail[];
    customer: Customer;
    employee: Employee;
}
