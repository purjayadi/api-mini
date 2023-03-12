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
exports.ReturOrderService = void 0;
const piutang_service_1 = require("../piutang/piutang.service");
const product_service_1 = require("./../product/product.service");
const stock_service_1 = require("./../stock/stock.service");
const typeorm_1 = require("typeorm");
const hellper_1 = require("./../utils/hellper");
const common_1 = require("@nestjs/common");
let ReturOrderService = class ReturOrderService {
    constructor(repository, product, piutang, detail, connection, stock, stockRepository, kas) {
        this.repository = repository;
        this.product = product;
        this.piutang = piutang;
        this.detail = detail;
        this.connection = connection;
        this.stock = stock;
        this.stockRepository = stockRepository;
        this.kas = kas;
    }
    async findAll(payload) {
        try {
            const { offset, limit, search } = payload;
            const returOrders = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), { relations: {
                    user: {
                        role: false,
                    },
                    returOrderDetails: {
                        product: {
                            prices: false,
                        },
                    },
                } }), (search && {
                where: [
                    {
                        order: { invNumber: (0, typeorm_1.Like)(`%${search}%`) },
                    },
                ],
            })));
            return (0, hellper_1.paginateResponse)(returOrders, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            const count = await this.repository.count();
            const number = 1000;
            const code = 'ROC-' + (count + number + 1);
            const returOrder = await this.repository.save(Object.assign(Object.assign({}, payload), { code: code }));
            if (returOrder) {
                if (payload.isIncrementStock) {
                    returOrder.returOrderDetails.map(async (detail) => {
                        const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                        const quantity = productValue.value * detail.quantity;
                        this.stock.increment(detail.productId, quantity);
                    });
                }
                if (payload.isDecreasePiutang) {
                    const findPiutang = await this.piutang.findPiutangByOrder(payload.orderId);
                    await this.piutang.decrementPiutang({
                        id: findPiutang.data.id,
                        amount: payload.total,
                    });
                }
                if (payload.isDecreaseKas) {
                    const kas = {
                        date: payload.date,
                        description: 'Retur penjualan dengan No. Retur ' + code,
                        source: 'Retur:' + code,
                        debit: payload.total,
                        credit: 0,
                        categoryId: payload.categoryId,
                    };
                    await this.kas.save(kas);
                }
            }
            return {
                message: 'Create retur order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const returOrder = await this.repository.findOneBy({ id });
            if (!returOrder) {
                throw new common_1.NotFoundException('Data Not Found');
            }
            return { data: returOrder, error: null, status: common_1.HttpStatus.OK };
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
            const returOrder = await this.repository.findOneBy({ id });
            if (!returOrder) {
                throw new common_1.NotFoundException('Data Not Found');
            }
            returOrder.returOrderDetails.map(async (detail) => {
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
                orderId: payload.orderId,
                total: payload.total,
                description: payload.description,
            };
            const newOrderDetail = [];
            (_a = payload.returOrderDetails) === null || _a === void 0 ? void 0 : _a.map(async (detail) => {
                newOrderDetail.push({
                    returOrderId: id,
                    productId: detail.productId,
                    price: detail.price,
                    quantity: detail.quantity,
                    unitId: detail.unitId,
                    subTotal: detail.subTotal,
                });
            });
            await this.detail.delete({ returOrderId: id });
            await this.detail.save(newOrderDetail);
            await this.repository.update(id, newOrder);
            payload.returOrderDetails.map(async (detail) => {
                const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                const stock = await this.stock.findOne(detail.productId);
                if (stock) {
                    const quantity = productValue.value * detail.quantity;
                    stock.quantity -= quantity;
                    await this.stockRepository.save(stock);
                    common_1.Logger.log(`Decrease stock success ${quantity}`);
                }
            });
            await queryRunner.commitTransaction();
            return {
                message: 'Update data successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const returOrder = await this.repository.findOneBy({ id });
            if (!returOrder) {
                throw new common_1.NotFoundException('Data Not Found');
            }
            const returDelete = await this.repository.delete(id);
            if (returDelete) {
                if (returOrder.isIncrementStock) {
                    returOrder.returOrderDetails.map(async (detail) => {
                        const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                        const quantity = productValue.value * detail.quantity;
                        this.stock.decrement(detail.productId, quantity);
                    });
                }
                if (returOrder.isDecreaseKas) {
                    const kas = await this.kas.findOne({
                        where: { source: 'Retur:' + returOrder.code },
                    });
                    if (kas) {
                        await this.kas.delete(kas.id);
                    }
                }
                if (returOrder.isDecreasePiutang) {
                    const findPiutang = await this.piutang.findPiutangByOrder(returOrder.orderId);
                    await this.piutang.incrementPiutang({
                        id: findPiutang.data.id,
                        amount: returOrder.total,
                    });
                }
            }
            return {
                message: 'Delete retur order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ReturOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RETUR_ORDER_REPOSITORY')),
    __param(3, (0, common_1.Inject)('RETUR_ORDER_DETAIL_REPOSITORY')),
    __param(4, (0, common_1.Inject)('DATA_SOURCE')),
    __param(6, (0, common_1.Inject)('STOCK_REPOSITORY')),
    __param(7, (0, common_1.Inject)('KAS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        product_service_1.ProductService,
        piutang_service_1.PiutangService,
        typeorm_1.Repository,
        typeorm_1.DataSource,
        stock_service_1.StockService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ReturOrderService);
exports.ReturOrderService = ReturOrderService;
//# sourceMappingURL=returOrder.service.js.map