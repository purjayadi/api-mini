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
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AuthService = class AuthService {
    constructor(jwtService, repository) {
        this.jwtService = jwtService;
        this.repository = repository;
    }
    async login(authLoginDto) {
        const user = await this.validateUser(authLoginDto);
        const payload = {
            id: user.id,
        };
        const token = this.jwtService.sign(payload);
        return {
            message: 'Login successfully',
            access_token: token,
            data: user,
            error: null,
            status: common_1.HttpStatus.OK,
        };
    }
    async validateUser(authLoginDto) {
        const { username, password } = authLoginDto;
        const user = await this.repository.findOneBy({ username });
        const validatePassword = await (user === null || user === void 0 ? void 0 : user.validatePassword(password));
        if (!user || !validatePassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async checkAllPermission(id) {
        try {
            const users = await this.repository.findOne({
                where: {
                    id: id,
                },
            });
            return users;
        }
        catch (error) {
            common_1.Logger.error(error);
        }
    }
    async me() {
        return {
            message: 'test',
            error: null,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map