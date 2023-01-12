"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const order_entity_1 = require("./../order/entities/order.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
let DashboardService = class DashboardService {
    constructor(schedule, customer, order) {
        this.schedule = schedule;
        this.customer = customer;
        this.order = order;
    }
    async getSchedule(payload) {
        try {
            const { date } = payload;
            const data = await this.schedule.find(Object.assign({}, (date
                ? {
                    where: [
                        date && {
                            date: date,
                        },
                    ],
                }
                : {})));
            return { data, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWidget() {
        const startOfMonth = (0, moment_1.default)().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = (0, moment_1.default)().endOf('month').format('YYYY-MM-DD');
        const startOfLastMonth = (0, moment_1.default)()
            .subtract(1, 'months')
            .startOf('month')
            .format('YYYY-MM-DD');
        const endOfLastMonth = (0, moment_1.default)()
            .subtract(1, 'months')
            .endOf('month')
            .format('YYYY-MM-DD');
        try {
            const thisMonth = await this.customer.findAndCount({
                where: {
                    joinDate: (0, typeorm_1.Between)(startOfMonth, endOfMonth),
                },
            });
            const lastMonth = await this.customer.findAndCount({
                where: {
                    joinDate: (0, typeorm_1.Between)(startOfLastMonth, endOfLastMonth),
                },
            });
            const activeCustomer = await this.customer.findAndCount({
                relations: ['orders'],
                where: {
                    orders: {
                        date: (0, typeorm_1.Between)(startOfMonth, endOfMonth),
                        status: order_entity_1.Status.COMPLETED,
                    },
                },
            });
            const activeLastMonthCustomer = await this.customer.findAndCount({
                relations: ['orders'],
                where: {
                    orders: {
                        date: (0, typeorm_1.Between)(startOfLastMonth, endOfLastMonth),
                        status: order_entity_1.Status.COMPLETED,
                    },
                },
            });
            const countOrder = await this.order.findAndCount({
                where: {
                    date: (0, typeorm_1.Between)(startOfMonth, endOfMonth),
                    status: order_entity_1.Status.COMPLETED,
                },
            });
            const countLastMonthOrder = await this.order.findAndCount({
                where: {
                    date: (0, typeorm_1.Between)(startOfLastMonth, endOfLastMonth),
                    status: order_entity_1.Status.COMPLETED,
                },
            });
            let orderTotal = 0;
            let lastMonthOrderTotal = 0;
            countOrder[0].map((val) => {
                orderTotal += parseInt(val.total);
            });
            countLastMonthOrder[0].map((val) => {
                lastMonthOrderTotal += parseInt(val.total);
            });
            const data = {
                totalCustomer: {
                    thisMonth: thisMonth[1],
                    lastMonth: lastMonth[1],
                },
                activeCustomer: {
                    thisMonth: activeCustomer[1],
                    lastMonth: activeLastMonthCustomer[1],
                },
                totalOrder: {
                    thisMonth: countOrder[1],
                    lastMonth: countLastMonthOrder[1],
                },
                totalOrderReduce: {
                    thisMonth: orderTotal,
                    lastMonth: lastMonthOrderTotal,
                },
            };
            return { data, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTransaction(payload) {
        try {
            const prevMonth = (0, moment_1.default)(new Date(`"${payload.year}-${payload.month}-1"`)).startOf('month');
            const prevMonthDays = prevMonth.daysInMonth();
            const prevMonthDates = [];
            for (let i = 0; i < prevMonthDays; i++) {
                const prevMonthDay = prevMonth
                    .clone()
                    .add(i, 'days')
                    .format('YYYY-MM-DD');
                const day = prevMonth.clone().add(i, 'days').format('DD');
                let totalOrder = 0;
                let totalPendingOrder = 0;
                const order = await this.order.findBy({
                    date: prevMonthDay,
                    status: order_entity_1.Status.COMPLETED,
                });
                const pendingOrder = await this.order.findBy({
                    date: prevMonthDay,
                    status: order_entity_1.Status.PO,
                });
                order.map((val) => {
                    totalOrder += parseInt(val.total);
                }),
                    pendingOrder.map((val) => {
                        totalPendingOrder += parseInt(val.total);
                    });
                prevMonthDates.push({
                    name: day,
                    order: totalOrder,
                    pendingOrder: totalPendingOrder,
                });
            }
            return {
                data: prevMonthDates,
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SCHEDULE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('CUSTOMER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('ORDER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map