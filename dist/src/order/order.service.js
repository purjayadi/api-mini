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
exports.OrderService = void 0;
const product_service_1 = require("./../product/product.service");
const stock_service_1 = require("./../stock/stock.service");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const hellper_1 = require("../utils/hellper");
const piutang_service_1 = require("../piutang/piutang.service");
let OrderService = class OrderService {
    constructor(piutangService, repository, orderDetail, stock, product, stockRepository, piutang, piutangPayment, piutangPaymentDetail, kas, connection) {
        this.piutangService = piutangService;
        this.repository = repository;
        this.orderDetail = orderDetail;
        this.stock = stock;
        this.product = product;
        this.stockRepository = stockRepository;
        this.piutang = piutang;
        this.piutangPayment = piutangPayment;
        this.piutangPaymentDetail = piutangPaymentDetail;
        this.kas = kas;
        this.connection = connection;
    }
    async findAll(payload) {
        try {
            const { offset, limit, search, orderBy, order } = payload;
            const orders = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), (search && {
                where: [
                    {
                        invNumber: (0, typeorm_1.Like)(`%${search}%`),
                    },
                    {
                        customer: {
                            name: (0, typeorm_1.Like)(`%${search}%`),
                        },
                    },
                ],
            })), { order: Object.assign({ code: 'DESC' }, (orderBy && { [orderBy]: order ? order : 'ASC' })) }));
            return (0, hellper_1.paginateResponse)(orders, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        var _a;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const data = await this.repository.find({
                order: { code: 'DESC' },
                take: 1,
                skip: 0,
                withDeleted: false,
            });
            const tryOrder = this.repository.create(Object.assign(Object.assign({}, payload), { code: ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.code) ? data[0].code : 0 }));
            const order = await this.repository.save(tryOrder);
            if (order) {
                const orderDetail = payload.orderDetails.map((val) => {
                    return {
                        orderId: order.id,
                        productId: val.productId,
                        quantity: val.quantity,
                        price: val.price,
                        discount: val.discount,
                        subTotal: val.subTotal,
                        unitId: val.unitId,
                    };
                });
                await this.orderDetail.save(orderDetail);
                payload.orderDetails.map(async (detail) => {
                    const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                    const quantity = productValue.value * detail.quantity;
                    this.stock.decrement(detail.productId, quantity);
                });
            }
            if (payload.paymentMethod === 'Due Date') {
                const piutang = await this.piutang.save({
                    orderId: order.id,
                    total: order.total,
                    remaining: order.total,
                });
                if (payload.payment) {
                    const tryPayment = this.piutangPayment.create({
                        date: payload.date,
                        paymentMethod: 'Cash',
                    });
                    const payment = await this.piutangPayment.save(tryPayment);
                    if (payment) {
                        const tryPaymentDetail = this.piutangPaymentDetail.create({
                            piutangId: piutang.id,
                            amount: payload.payment,
                            piutangPaymentId: payment.id,
                        });
                        const paymentDetail = await this.piutangPaymentDetail.save(tryPaymentDetail);
                        if (paymentDetail) {
                            this.piutangService.decrement({
                                id: piutang.id,
                                amount: payload.payment,
                            });
                        }
                    }
                }
            }
            else {
                if (payload.status === 'Completed') {
                    const orderDetail = payload.orderDetails.reduce((accumulator, cur) => {
                        const date = cur.product.category.id;
                        const found = accumulator.find((elem) => elem.product.category.id === date);
                        if (found)
                            found.subTotal += cur.subTotal;
                        else
                            accumulator.push(cur);
                        return accumulator;
                    }, []);
                    orderDetail.map(async (detail) => {
                        const payloadKas = {
                            date: payload.date,
                            description: 'Penjualan dengan No. Invoice ' + order.invNumber,
                            debit: detail.subTotal,
                            source: 'Penjualan:' + order.invNumber,
                            credit: 0,
                            categoryId: detail.product.category.id,
                        };
                        this.kas.save(payloadKas);
                    });
                }
            }
            await queryRunner.commitTransaction();
            return {
                message: 'Create order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findOne(id) {
        try {
            const order = await this.repository.findOneBy({ id });
            if (!order) {
                throw new common_1.NotFoundException('Order Not Found');
            }
            return { data: order, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        var _a;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const order = await this.repository.findOneBy({ id });
            if (!order) {
                throw new common_1.NotFoundException('Order Not Found');
            }
            order.orderDetails.map(async (detail) => {
                const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                const stock = await this.stock.findOne(detail.productId);
                if (stock) {
                    const quantity = productValue.value * detail.quantity;
                    stock.quantity += quantity;
                    await this.stockRepository.save(stock);
                    common_1.Logger.log(`Increase stock success ${quantity}`);
                }
            });
            const newOrder = {
                date: payload.date,
                customerId: payload.customerId,
                employeeId: payload.employeeId,
                total: payload.total,
                paymentMethod: payload.paymentMethod,
                status: payload.status,
            };
            const newOrderDetail = [];
            (_a = payload.orderDetails) === null || _a === void 0 ? void 0 : _a.map(async (detail) => {
                newOrderDetail.push({
                    orderId: id,
                    productId: detail.productId,
                    price: detail.price,
                    quantity: detail.quantity,
                    unitId: detail.unitId,
                    subTotal: detail.subTotal,
                });
            });
            await this.orderDetail.delete({ orderId: id });
            await this.orderDetail.save(newOrderDetail);
            await this.repository.update(id, newOrder);
            payload.orderDetails.map(async (detail) => {
                const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                const stock = await this.stock.findOne(detail.productId);
                if (stock) {
                    const quantity = productValue.value * detail.quantity;
                    stock.quantity -= quantity;
                    await this.stockRepository.save(stock);
                    common_1.Logger.log(`Decrease stock success ${quantity}`);
                }
            });
            const kas = await this.kas.findOne({
                where: { source: 'Penjualan:' + order.invNumber },
            });
            if (kas) {
                const payloadKas = {
                    date: payload.date,
                    description: 'Penjualan dengan No. Invoice ' + order.invNumber,
                    debit: payload.total,
                    source: 'Penjualan:' + order.invNumber,
                    credit: 0,
                };
                await this.kas.update(kas.id, payloadKas);
            }
            else {
                if (payload.status === 'Completed') {
                    const payloadKas = {
                        date: payload.date,
                        description: 'Penjualan dengan No. Invoice ' + order.invNumber,
                        debit: payload.total,
                        source: 'Penjualan:' + order.invNumber,
                        credit: 0,
                    };
                    await this.kas.save(payloadKas);
                }
                else if (payload.status === 'Canceled') {
                    await this.kas.softDelete(kas.id);
                }
            }
            await queryRunner.commitTransaction();
            return {
                message: 'Update order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        try {
            const order = await this.repository.findOneBy({ id });
            if (!order) {
                throw new common_1.NotFoundException('Order Not Found');
            }
            if (order) {
                order.orderDetails.map(async (detail) => {
                    const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                    const quantity = productValue.value * detail.quantity;
                    const increment = this.stock.increment(detail.productId, quantity);
                    if (increment) {
                        await this.repository.delete({ id });
                    }
                });
                const kas = await this.kas.findOne({
                    where: { source: 'Penjualan:' + order.invNumber },
                });
                if (kas) {
                    await this.kas.softDelete(kas.id);
                }
            }
            return {
                message: 'Delete order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async softDelete(id) {
        try {
            const order = await this.repository.findOneBy({ id });
            if (!order) {
                throw new common_1.NotFoundException('Order Not Found');
            }
            if (order) {
                order.orderDetails.map(async (detail) => {
                    const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                    const quantity = productValue.value * detail.quantity;
                    const increment = this.stock.increment(detail.productId, quantity);
                    if (increment) {
                        await this.repository.softDelete({ id });
                    }
                });
            }
            const kas = await this.kas.findBy({
                source: 'Penjualan:' + order.invNumber,
            });
            if (kas) {
                kas.map(async (val) => {
                    await this.kas.softDelete(val.id);
                });
            }
            return {
                message: 'Soft delete order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restoreSoftDelete(id) {
        try {
            const order = await this.repository.findOne({
                where: { id },
                withDeleted: true,
            });
            if (!order) {
                throw new common_1.NotFoundException('Order Not Found');
            }
            const kas = await this.kas.findOne({
                where: { source: 'Penjualan:' + order.invNumber },
            });
            if (kas) {
                await this.kas.recover({ id: kas.id });
            }
            if (order) {
                order.orderDetails.map(async (detail) => {
                    const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                    const quantity = productValue.value * detail.quantity;
                    const increment = this.stock.decrement(detail.productId, quantity);
                    if (increment) {
                        await this.repository.recover({ id });
                    }
                });
            }
            return {
                message: 'Restore order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('ORDER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('ORDER_DETAIL_REPOSITORY')),
    __param(5, (0, common_1.Inject)('STOCK_REPOSITORY')),
    __param(6, (0, common_1.Inject)('PIUTANG_REPOSITORY')),
    __param(7, (0, common_1.Inject)('PIUTANG_PAYMENT_REPOSITORY')),
    __param(8, (0, common_1.Inject)('PIUTANG_PAYMENT_DETAIL_REPOSITORY')),
    __param(9, (0, common_1.Inject)('KAS_REPOSITORY')),
    __param(10, (0, common_1.Inject)('DATA_SOURCE')),
    __metadata("design:paramtypes", [piutang_service_1.PiutangService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        stock_service_1.StockService,
        product_service_1.ProductService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map