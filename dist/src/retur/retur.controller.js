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
exports.ReturController = void 0;
const common_1 = require("@nestjs/common");
const retur_service_1 = require("./retur.service");
const create_retur_dto_1 = require("./dto/create-retur.dto");
const update_retur_dto_1 = require("./dto/update-retur.dto");
let ReturController = class ReturController {
    constructor(returService) {
        this.returService = returService;
    }
    create(createReturDto) {
        return this.returService.create(createReturDto);
    }
    findAll() {
        return this.returService.findAll();
    }
    findOne(id) {
        return this.returService.findOne(+id);
    }
    update(id, updateReturDto) {
        return this.returService.update(+id, updateReturDto);
    }
    remove(id) {
        return this.returService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_retur_dto_1.CreateReturDto]),
    __metadata("design:returntype", void 0)
], ReturController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReturController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReturController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_retur_dto_1.UpdateReturDto]),
    __metadata("design:returntype", void 0)
], ReturController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReturController.prototype, "remove", null);
ReturController = __decorate([
    (0, common_1.Controller)('retur'),
    __metadata("design:paramtypes", [retur_service_1.ReturService])
], ReturController);
exports.ReturController = ReturController;
//# sourceMappingURL=retur.controller.js.map