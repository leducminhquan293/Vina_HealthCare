"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        if (createUserDto.email) {
            const existingUser = await this.userModel.findOne({ email: createUserDto.email });
            if (existingUser) {
                throw new common_1.ConflictException('Email đã tồn tại');
            }
        }
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async findAll() {
        await this.ensureUserIds();
        return this.userModel.find().select('user_id full_name date_of_birth gender phone email address avatar type role created_at').sort({ created_at: -1 }).exec();
    }
    async ensureUserIds() {
        const usersWithoutId = await this.userModel.find({ user_id: { $exists: false } }).exec();
        if (usersWithoutId.length > 0) {
            const lastUser = await this.userModel.findOne({}, {}, { sort: { 'user_id': -1 } });
            let nextId = lastUser ? lastUser.user_id + 1 : 1;
            for (const user of usersWithoutId) {
                await this.userModel.updateOne({ _id: user._id }, { $set: { user_id: nextId++ } });
            }
        }
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        return user;
    }
    async findByUserId(userId) {
        const user = await this.userModel.findOne({ user_id: userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findByType(type) {
        return this.userModel.find({ type }).sort({ created_at: -1 }).exec();
    }
    async update(id, updateUserDto) {
        if (updateUserDto.email) {
            const existingUser = await this.userModel.findOne({
                email: updateUserDto.email,
                _id: { $ne: id }
            });
            if (existingUser) {
                throw new common_1.ConflictException('Email đã tồn tại');
            }
        }
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        return updatedUser;
    }
    async updateByUserId(userId, updateUserDto) {
        if (updateUserDto.email) {
            const existingUser = await this.userModel.findOne({
                email: updateUserDto.email,
                user_id: { $ne: userId }
            });
            if (existingUser) {
                throw new common_1.ConflictException('Email đã tồn tại');
            }
        }
        const updatedUser = await this.userModel
            .findOneAndUpdate({ user_id: userId }, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        return updatedUser;
    }
    async remove(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        return deletedUser;
    }
    async removeByUserId(userId) {
        const deletedUser = await this.userModel.findOneAndDelete({ user_id: userId }).exec();
        if (!deletedUser) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        return deletedUser;
    }
    async countByType(type) {
        return this.userModel.countDocuments({ type }).exec();
    }
    async searchUsers(query) {
        return this.userModel.find({
            $or: [
                { full_name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } }
            ]
        }).sort({ created_at: -1 }).exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map