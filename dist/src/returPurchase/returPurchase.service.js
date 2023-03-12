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
exports.ReturPurchaseService = void 0;
const product_service_1 = require("./../product/product.service");
const stock_service_1 = require("./../stock/stock.service");
const typeorm_1 = require("typeorm");
const hellper_1 = require("./../utils/hellper");
const common_1 = require("@nestjs/common");
let ReturPurchaseService = class ReturPurchaseService {
    constructor(repository, product, detail, connection, stock, stockRepository) {
        this.repository = repository;
        this.product = product;
        this.detail = detail;
        this.connection = connection;
        this.stock = stock;
        this.stockRepository = stockRepository;
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const returPurchases = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), { relations: {
                    user: {
                        role: false,
                    },
                    supplier: {},
                    returPurchaseDetails: {
                        product: {
                            prices: false,
                        },
                    },
                } }));
            return (0, hellper_1.paginateResponse)(returPurchases, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            const count = await this.repository.count();
            const number = 1000;
            const code = 'RBP-' + (count + number + 1);
            const returPurchase = await this.repository.save(Object.assign(Object.assign({}, payload), { code: code }));
            if (returPurchase) {
                returPurchase.returPurchaseDetails.map(async (detail) => {
                    const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                    const quantity = productValue.value * detail.quantity;
                    this.stock.decrement(detail.productId, quantity);
                });
            }
            return {
                message: 'Create retur purchase successfully',
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
            const returPurchase = await this.repository.findOneBy({ id });
            if (!returPurchase) {
                throw new common_1.NotFoundException('Data Not Found');
            }
            return { data: returPurchase, error: null, status: common_1.HttpStatus.OK };
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
            const returPurchase = await this.repository.findOneBy({ id });
            if (!returPurchase) {
                throw new common_1.NotFoundException('Data Not Found');
            }
            returPurchase.returPurchaseDetails.map(async (detail) => {
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
                supplierId: payload.supplierId,
                total: payload.total,
                description: payload.description,
            };
            const newOrderDetail = [];
            (_a = payload.returPurchaseDetails) === null || _a === void 0 ? void 0 : _a.map(async (detail) => {
                newOrderDetail.push({
                    returPurchaseId: id,
                    productId: detail.productId,
                    price: detail.price,
                    quantity: detail.quantity,
                    unitId: detail.unitId,
                    subTotal: detail.subTotal,
                });
            });
            await this.detail.delete({ returPurchaseId: id });
            await this.detail.save(newOrderDetail);
            await this.repository.update(id, newOrder);
            payload.returPurchaseDetails.map(async (detail) => {
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
            const returPurchase = await this.repository.findOneBy({ id });
            if (!returPurchase) {
                throw new common_1.NotFoundException('Data Not Found');
            }
            const returDelete = await this.repository.delete(id);
            if (returDelete) {
                returPurchase.returPurchaseDetails.map(async (detail) => {
                    const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                    const quantity = productValue.value * detail.quantity;
                    this.stock.increment(detail.productId, quantity);
                });
            }
            return {
                message: 'Delete retur purchase successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ReturPurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RETUR_PURCHASE_REPOSITORY')),
    __param(2, (0, common_1.Inject)('RETUR_PURCHASE_DETAIL_REPOSITORY')),
    __param(3, (0, common_1.Inject)('DATA_SOURCE')),
    __param(5, (0, common_1.Inject)('STOCK_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        product_service_1.ProductService,
        typeorm_1.Repository,
        typeorm_1.DataSource,
        stock_service_1.StockService,
        typeorm_1.Repository])
], ReturPurchaseService);
exports.ReturPurchaseService = ReturPurchaseService;
//# sourceMappingURL=returPurchase.service.js.map