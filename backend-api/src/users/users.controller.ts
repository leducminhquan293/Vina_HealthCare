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
import { Role } from './schema/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(@Query('role') role?: string, @Query('search') search?: string) {
        if (search) {
            return this.usersService.searchUsers(search);
        }
        if (role) {
            return this.usersService.findByRole(role);
        }
        return this.usersService.findAll();
    }

    @Get('count')
    async countByRole(@Query('role') role: string) {
        return { count: await this.usersService.countByRole(role) };
    }

    @Get('roles')
    async getRoles() {
        return {
            roles: Object.values(Role),
            description: {
                [Role.PATIENT]: 'Bệnh nhân',
                [Role.DOCTOR]: 'Bác sĩ',
                [Role.NURSE]: 'Y tá'
            }
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.usersService.remove(id);
        return { message: 'Xóa người dùng thành công' };
    }
} 