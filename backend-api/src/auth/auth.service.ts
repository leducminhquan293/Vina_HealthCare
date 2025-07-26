import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import { SignUpDto } from 'src/users/dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, Role } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<any> {
        // Convert SignUpDto to CreateUserDto
        const createUserDto: CreateUserDto = {
            full_name: signUpDto.name,
            email: signUpDto.email,
            date_of_birth: signUpDto.date_of_birth,
            gender: signUpDto.gender,
            phone: signUpDto.phone,
            address: signUpDto.address,
            avatar: signUpDto.avatar,
            type: signUpDto.type,
            role: signUpDto.role || Role.PATIENT
        };
        const user = await this.usersService.create(createUserDto);
        const payload = { sub: user.user_id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                email: user.email,
                role: user.role,
                full_name: user.full_name,
                user_id: user.user_id
            }
        };
    }

    async signIn(signInDto: SignInDto): Promise<any> {
        const user = await this.usersService.findByEmail(signInDto.email);
        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        // Note: Password comparison would need to be implemented if password field exists
        const payload = { sub: user.user_id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                email: user.email,
                role: user.role,
                full_name: user.full_name,
                user_id: user.user_id
            }
        };
    }
}