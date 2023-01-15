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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiutangService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const hellper_1 = require("../utils/hellper");
let PiutangService = class PiutangService {
    constructor(repository, paymentRepository, kas) {
        this.repository = repository;
        this.paymentRepository = paymentRepository;
        this.kas = kas;
    }
    async findAll(payload) {
        try {
            const { offset, limit, withDeleted, search, dueDate, customer, categoryId, } = payload;
            const piutang = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ relations: ['piutangPayments', 'order'] }, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), (withDeleted === 'true' ? { withDeleted: true } : {})), (search || dueDate || customer || categoryId
                ? {
                    where: [
                        search && {
                            order: {
                                invNumber: (0, typeorm_1.Like)(`%${search}%`),
                                customer: {
                                    name: (0, typeorm_1.Like)(`%${search}%`),
                                    customerNumber: (0, typeorm_1.Like)(`%${search}%`),
                                },
                            },
                        },
                        dueDate && {
                            order: {
                                dueDate: dueDate,
                            },
                        },
                        customer && {
                            order: {
                                customer: {
                                    id: customer,
                                },
                            },
                        },
                        categoryId && {
                            order: {
                                orderDetails: {
                                    product: {
                                        categoryId: categoryId,
                                    },
                                },
                            },
                        },
                    ],
                }
                : {})), { order: {
                    order: {
                        dueDate: 'ASC',
                    },
                } }));
            return (0, hellper_1.paginateResponse)(piutang, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findPiutangByCustomer(payload) {
        try {
            const { customer, dueDate } = payload;
            const piutang = await this.repository.find({
                where: {
                    order: Object.assign({ customer: {
                            id: customer,
                        } }, (dueDate && { dueDate: dueDate })),
                },
            });
            if (piutang.length <= 0) {
                throw new common_1.NotFoundException('Piutang Order Not Found');
            }
            return { data: piutang, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findPayment(payload) {
        try {
            const { offset, limit, withDeleted, search, orderBy, order } = payload;
            const payment = await this.paymentRepository.findAndCount(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ relations: ['piutang', 'piutang.order.customer'] }, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), (withDeleted === 'true' ? { withDeleted: true } : {})), (search && {
                where: [
                    {
                        paymentNumber: (0, typeorm_1.Like)(`%${search}%`),
                    },
                ],
            })), (orderBy && { order: { [orderBy]: order } })));
            return (0, hellper_1.paginateResponse)(payment, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async payment(payload) {
        try {
            const tryPayment = this.paymentRepository.create(payload);
            const payment = await this.paymentRepository.save(tryPayment);
            this.decrement({ id: payment.piutangId, amount: payment.amount });
            if (payment) {
                const kas = {
                    date: payload.date,
                    description: 'Pembayaran dengan No. Pembayaran ' + payment.paymentNumber,
                    source: 'Pembayaran:' + payment.paymentNumber,
                    debit: payment.amount,
                    credit: 0,
                    categoryId: payload.categoryId,
                };
                await this.kas.save(kas);
            }
            return {
                message: 'Payment order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePayment(id) {
        try {
            const findPaymentById = await this.paymentRepository.findOne({
                where: {
                    id,
                },
            });
            if (!findPaymentById) {
                return {
                    message: 'Unable to find payment',
                    error: null,
                    status: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.paymentRepository.delete(id);
            this.increment({
                id: findPaymentById.piutangId,
                amount: findPaymentById.amount,
            });
            const kas = await this.kas.findBy({
                source: 'Pembayaran:' + findPaymentById.paymentNumber,
            });
            if (kas) {
                await this.kas.remove(kas);
            }
            return {
                message: 'Delete payment successfuly',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async increment(payload) {
        try {
            const { id, amount } = payload;
            const piutang = await this.repository.findOneBy({ id: id });
            if (!piutang) {
                return false;
            }
            await this.repository.increment({ id: id }, 'remaining', amount);
            common_1.Logger.log(`Increment piutang successfully ${amount}`);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async decrement(payload) {
        try {
            const { id, amount } = payload;
            const piutang = await this.repository.findOneBy({ id: id });
            if (!piutang) {
                return false;
            }
            await this.repository.decrement({ id: id }, 'remaining', amount);
            common_1.Logger.log(`Decrement piutang successfully ${amount}`);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
PiutangService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PIUTANG_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PIUTANG_PAYMENT_REPOSITORY')),
    __param(2, (0, common_1.Inject)('KAS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PiutangService);
exports.PiutangService = PiutangService;
//# sourceMappingURL=piutang.service.js.map