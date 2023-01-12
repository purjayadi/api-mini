import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
export declare class UserService {
    private readonly repository;
    constructor(repository: Repository<User>);
    findAll(payload: FindUserDto): Promise<IResponse | IPaginate>;
    create(payload: CreateUserDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateUserDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
    findOneByUsername(username: string): Promise<any>;
    checkPermission(id: string): Promise<User>;
}
