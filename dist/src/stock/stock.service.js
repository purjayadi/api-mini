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
exports.StockService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const stock_entity_1 = require("./entities/stock.entity");
let StockService = class StockService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const Products = await this.repository.find(Object.assign(Object.assign({ relations: {
                    product: true,
                } }, (limit && { take: limit })), (offset && { skip: offset })));
            return { data: Products, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async increment(productId, quantity) {
        try {
            const stock = await this.repository.findOneBy({
                productId: productId,
            });
            if (stock) {
                stock.quantity += quantity;
                await this.repository.save(stock);
                common_1.Logger.log('Increment stock successfully');
                return true;
            }
            else {
                const newStock = new stock_entity_1.Stock();
                newStock.productId = productId;
                newStock.quantity = quantity;
                await this.repository.save(newStock);
                common_1.Logger.log('Create initial stock successfully');
                return true;
            }
        }
        catch (error) {
            common_1.Logger.log(error);
            return false;
        }
    }
    async decrement(productId, quantity) {
        try {
            const stock = await this.repository.findOneBy({
                productId: productId,
            });
            if (stock) {
                stock.quantity -= quantity;
                await this.repository.save(stock);
                common_1.Logger.log('Decrement stock successfully');
            }
            else {
                common_1.Logger.log('Stock not found');
            }
        }
        catch (error) {
            common_1.Logger.log(error);
        }
    }
    async findOne(id) {
        const stock = await this.repository.findOne({
            where: {
                productId: id,
            },
        });
        return stock;
    }
};
StockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('STOCK_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map