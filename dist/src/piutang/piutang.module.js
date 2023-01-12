"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiutangModule = void 0;
const database_module_1 = require("../database/database.module");
const auth_module_1 = require("./../auth/auth.module");
const common_1 = require("@nestjs/common");
const piutang_provider_1 = require("./piutang.provider");
const piutang_service_1 = require("./piutang.service");
const piutang_controller_1 = require("./piutang.controller");
let PiutangModule = class PiutangModule {
};
PiutangModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, database_module_1.DatabaseModule],
        controllers: [piutang_controller_1.PiutangController],
        providers: [...piutang_provider_1.piutangProviders, piutang_service_1.PiutangService],
        exports: [piutang_service_1.PiutangService],
    })
], PiutangModule);
exports.PiutangModule = PiutangModule;
//# sourceMappingURL=piutang.module.js.map