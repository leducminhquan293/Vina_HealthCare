import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    HttpStatus,
    HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(@Query('type') type?: string, @Query('search') search?: string) {
        if (search) {
            return this.usersService.searchUsers(search);
        }
        if (type) {
            return this.usersService.findByType(type);
        }
        return this.usersService.findAll();
    }

    @Get('count')
    async countByType(@Query('type') type: string) {
        return { count: await this.usersService.countByType(type) };
    }

    @Get('types')
    async getTypes() {
        return {
            types: Object.values(UserType),
            description: {
                [UserType.NORMAL]: 'Người dùng thường',
                [UserType.VIP]: 'Người dùng VIP'
            }
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        // Kiểm tra xem id có phải là số không (user_id) hay string (_id)
        const userId = parseInt(id);
        if (!isNaN(userId)) {
            return this.usersService.findByUserId(userId);
        }
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        // Kiểm tra xem id có phải là số không (user_id) hay string (_id)
        const userId = parseInt(id);
        if (!isNaN(userId)) {
            return this.usersService.updateByUserId(userId, updateUserDto);
        }
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        // Kiểm tra xem id có phải là số không (user_id) hay string (_id)
        const userId = parseInt(id);
        if (!isNaN(userId)) {
            await this.usersService.removeByUserId(userId);
        } else {
            await this.usersService.remove(id);
        }
        return { message: 'Xóa người dùng thành công' };
    }
} 