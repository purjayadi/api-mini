import { AuthModule } from './../auth/auth.module';
import { User } from './entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UserService,
  ],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
