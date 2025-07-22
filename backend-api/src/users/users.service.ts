import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException('Email đã tồn tại');
        }

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().sort({ created_at: -1 }).exec();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('Không tìm thấy người dùng');
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByRole(role: string): Promise<User[]> {
        return this.userModel.find({ role }).sort({ created_at: -1 }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        // Nếu có cập nhật email, kiểm tra email mới có bị trùng không
        if (updateUserDto.email) {
            const existingUser = await this.userModel.findOne({
                email: updateUserDto.email,
                _id: { $ne: id }
            });
            if (existingUser) {
                throw new ConflictException('Email đã tồn tại');
            }
        }

        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();

        if (!updatedUser) {
            throw new NotFoundException('Không tìm thấy người dùng');
        }

        return updatedUser;
    }

    async remove(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new NotFoundException('Không tìm thấy người dùng');
        }
        return deletedUser;
    }

    async countByRole(role: string): Promise<number> {
        return this.userModel.countDocuments({ role }).exec();
    }

    async searchUsers(query: string): Promise<User[]> {
        return this.userModel.find({
            $or: [
                { full_name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } }
            ]
        }).sort({ created_at: -1 }).exec();
    }
} 