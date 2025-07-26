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
        // Kiểm tra email đã tồn tại chưa (nếu có email)
        if (createUserDto.email) {
            const existingUser = await this.userModel.findOne({ email: createUserDto.email });
            if (existingUser) {
                throw new ConflictException('Email đã tồn tại');
            }
        }

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        // Kiểm tra và tạo user_id cho các user cũ nếu chưa có
        await this.ensureUserIds();
        return this.userModel.find().select('user_id full_name date_of_birth gender phone email address avatar type role created_at').sort({ created_at: -1 }).exec();
    }

    // Hàm đảm bảo tất cả user đều có user_id
    private async ensureUserIds(): Promise<void> {
        const usersWithoutId = await this.userModel.find({ user_id: { $exists: false } }).exec();
        if (usersWithoutId.length > 0) {
            const lastUser = await this.userModel.findOne({}, {}, { sort: { 'user_id': -1 } });
            let nextId = lastUser ? lastUser.user_id + 1 : 1;

            for (const user of usersWithoutId) {
                await this.userModel.updateOne(
                    { _id: user._id },
                    { $set: { user_id: nextId++ } }
                );
            }
        }
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException('Không tìm thấy người dùng');
        }
        return user;
    }

    async findByUserId(userId: number): Promise<User> {
        const user = await this.userModel.findOne({ user_id: userId }).exec();
        if (!user) {
            throw new NotFoundException('Không tìm thấy người dùng');
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByType(type: string): Promise<User[]> {
        return this.userModel.find({ type }).sort({ created_at: -1 }).exec();
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

    async updateByUserId(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        // Nếu có cập nhật email, kiểm tra email mới có bị trùng không
        if (updateUserDto.email) {
            const existingUser = await this.userModel.findOne({
                email: updateUserDto.email,
                user_id: { $ne: userId }
            });
            if (existingUser) {
                throw new ConflictException('Email đã tồn tại');
            }
        }

        const updatedUser = await this.userModel
            .findOneAndUpdate({ user_id: userId }, updateUserDto, { new: true })
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

    async removeByUserId(userId: number): Promise<User> {
        const deletedUser = await this.userModel.findOneAndDelete({ user_id: userId }).exec();
        if (!deletedUser) {
            throw new NotFoundException('Không tìm thấy người dùng');
        }
        return deletedUser;
    }

    async countByType(type: string): Promise<number> {
        return this.userModel.countDocuments({ type }).exec();
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