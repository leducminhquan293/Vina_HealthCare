import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    private ensureUserIds;
    findOne(id: string): Promise<User>;
    findByUserId(userId: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByType(type: string): Promise<User[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateByUserId(userId: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    removeByUserId(userId: number): Promise<User>;
    countByType(type: string): Promise<number>;
    searchUsers(query: string): Promise<User[]>;
}
