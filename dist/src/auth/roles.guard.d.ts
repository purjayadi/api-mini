import { CanActivate, Type } from '@nestjs/common';
declare const RoleGuard: (role: string) => Type<CanActivate>;
export default RoleGuard;
