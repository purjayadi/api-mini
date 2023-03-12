import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './../user/user.provider';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CaslAbilityFactory } from './casl.ability.factory';
import { PermissionsGuard } from './permission.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...userProviders,
    CaslAbilityFactory,
    PermissionsGuard,
    AuthService,
    JwtStrategy,
  ],
  exports: [CaslAbilityFactory, PermissionsGuard, AuthService],
})
export class AuthModule {}
