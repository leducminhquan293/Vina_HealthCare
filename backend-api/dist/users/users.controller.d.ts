import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './schema/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./schema/user.schema").User>;
    findAll(role?: string, search?: string): Promise<import("./schema/user.schema").User[]>;
    countByRole(role: string): Promise<{
        count: number;
    }>;
    getRoles(): Promise<{
        roles: Role[];
        description: {
            Patient: string;
            Doctor: string;
            Nurse: string;
        };
    }>;
    findOne(id: string): Promise<import("./schema/user.schema").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schema/user.schema").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
