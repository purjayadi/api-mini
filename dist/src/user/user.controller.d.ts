import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<IResponse>;
    findAll(payload: FindUserDto): Promise<IResponse | IPaginate>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
