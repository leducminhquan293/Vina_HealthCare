import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./schema/user.schema").User>;
    findAll(type?: string, search?: string): Promise<import("./schema/user.schema").User[]>;
    countByType(type: string): Promise<{
        count: number;
    }>;
    getTypes(): Promise<{
        types: UserType[];
        description: {
            normal: string;
            vip: string;
        };
    }>;
    findOne(id: string): Promise<import("./schema/user.schema").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schema/user.schema").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
