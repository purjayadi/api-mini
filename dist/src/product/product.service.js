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
exports.ProductService = void 0;
const stock_service_1 = require("./../stock/stock.service");
const typeorm_1 = require("typeorm");
const hellper_1 = require("./../utils/hellper");
const common_1 = require("@nestjs/common");
let ProductService = class ProductService {
    constructor(repository, price, stock) {
        this.repository = repository;
        this.price = price;
        this.stock = stock;
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const Products = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), { relations: {
                    supplier: true,
                } }));
            return (0, hellper_1.paginateResponse)(Products, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            const count = await this.repository.count();
            const number = (0, hellper_1.randomNumber)(1000, 9999);
            const code = 'KB-' + (count + number + 1);
            const product = await this.repository.save(Object.assign(Object.assign({}, payload), { code: code, prices: payload.prices }));
            if (product) {
                await this.stock.increment(product.id, 0);
            }
            return {
                message: 'Create Product successfully',
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
            const Product = await this.repository.findOneBy({ id });
            if (!Product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return { data: Product, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const Product = await this.repository.findOneBy({ id });
            if (!Product) {
                throw new common_1.NotFoundException('Product not found');
            }
            const newPayload = Object.assign(Object.assign({}, payload), { id: id });
            const updatedProduct = this.repository.preload(newPayload);
            await this.repository.save(await updatedProduct);
            return {
                message: 'Update Product successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const Product = await this.repository.findOneBy({ id });
            if (!Product) {
                throw new common_1.NotFoundException('Product not found');
            }
            await this.repository.delete(id);
            return {
                message: 'Delete Product successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findValueProductByUnit(productId, unitId) {
        const price = this.price.findOne({
            where: { productId: productId, unitId: unitId },
        });
        return price;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_REPOSITORY')),
    __param(1, (0, common_1.Inject)('PRODUCT_PRICE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        stock_service_1.StockService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map