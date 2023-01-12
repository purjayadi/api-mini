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
exports.PurchaseService = void 0;
const hellper_1 = require("../utils/hellper");
const product_service_1 = require("./../product/product.service");
const stock_service_1 = require("./../stock/stock.service");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let PurchaseService = class PurchaseService {
    constructor(repository, stock, product, purchaseLine, stockRepository, connection) {
        this.repository = repository;
        this.stock = stock;
        this.product = product;
        this.purchaseLine = purchaseLine;
        this.stockRepository = stockRepository;
        this.connection = connection;
    }
    async create(payload) {
        try {
            const data = await this.repository.find({
                order: { code: 'DESC' },
                take: 1,
                skip: 0,
                withDeleted: true,
            });
            const lastInvoice = data.length > 0
                ? data[0].code.replace(/^\D+/g, '')
                : 1000;
            const invNumber = 'INP-' + (Number(lastInvoice) + 1);
            const purchase = await this.repository.save(Object.assign(Object.assign({}, payload), { code: invNumber }));
            if (purchase) {
                payload.purchaseLines.map(async (line) => {
                    const productValue = await this.product.findValueProductByUnit(line.productId, line.unitId);
                    const quantity = productValue.value * line.quantity;
                    this.stock.increment(line.productId, quantity);
                });
            }
            return {
                message: 'Create purchase order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const purchaseOrders = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), { relations: {
                    user: {
                        role: false,
                    },
                    supplier: true,
                } }));
            return (0, hellper_1.paginateResponse)(purchaseOrders, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const purchaseOrder = await this.repository.findOne({
                where: {
                    id: id,
                },
                relations: {
                    user: {
                        role: false,
                    },
                    supplier: true,
                },
            });
            if (!purchaseOrder) {
                throw new common_1.NotFoundException('Purchase Order Not Found');
            }
            return { data: purchaseOrder, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const purchaseOrder = await this.repository.findOneBy({ id });
            if (!purchaseOrder) {
                throw new common_1.NotFoundException('Purchase Order Not Found');
            }
            purchaseOrder.purchaseLines.map(async (detail) => {
                const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                const stock = await this.stock.findOne(detail.productId);
                if (stock) {
                    const quantity = productValue.value * detail.quantity;
                    await this.stockRepository.decrement({ productId: detail.productId }, 'quantity', quantity);
                    common_1.Logger.log(`Decrement stock success ${quantity}`);
                }
            });
            const newPurchase = {
                date: payload.date,
                discount: payload.discount,
                total: payload.total,
                supplierId: payload.supplierId,
                userId: payload.userId,
                warehouseId: payload.warehouseId,
                status: payload.status,
            };
            const purchaseLines = [];
            payload.purchaseLines.map(async (line) => {
                purchaseLines.push({
                    purchaseOrderId: id,
                    productId: line.productId,
                    unitId: line.unitId,
                    quantity: line.quantity,
                    price: line.price,
                    subTotal: line.subTotal,
                });
            });
            await this.purchaseLine.delete({ purchaseOrderId: id });
            await this.purchaseLine.save(purchaseLines);
            await this.repository.update(id, newPurchase);
            payload.purchaseLines.map(async (detail) => {
                const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                const stock = await this.stock.findOne(detail.productId);
                if (stock) {
                    const quantity = productValue.value * detail.quantity;
                    await this.stockRepository.increment({ productId: detail.productId }, 'quantity', quantity);
                    common_1.Logger.log(`Increase stock success ${quantity}`);
                }
            });
            await queryRunner.commitTransaction();
            return {
                message: 'Update purchase order successfully',
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
            const purchaseOrder = await this.repository.findOneBy({ id });
            if (!purchaseOrder) {
                throw new common_1.NotFoundException('Purchase Order Not Found');
            }
            purchaseOrder.purchaseLines.map(async (detail) => {
                const productValue = await this.product.findValueProductByUnit(detail.productId, detail.unitId);
                const quantity = productValue.value * detail.quantity;
                const increment = this.stock.decrement(detail.productId, quantity);
                common_1.Logger.log(`Decrement stock success ${quantity}`);
                if (increment) {
                    await this.repository.delete({ id });
                }
            });
            return {
                message: 'Remove purchase order successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PURCHASE_REPOSITORY')),
    __param(3, (0, common_1.Inject)('PURCHASE_ORDER_LINE_REPOSITORY')),
    __param(4, (0, common_1.Inject)('STOCK_REPOSITORY')),
    __param(5, (0, common_1.Inject)('DATA_SOURCE')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        stock_service_1.StockService,
        product_service_1.ProductService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], PurchaseService);
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=purchase.service.js.map