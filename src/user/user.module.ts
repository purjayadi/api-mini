import { User } from './entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        },
        UserService
    ],
    exports: [UserService]
})
export class UserModule { }
