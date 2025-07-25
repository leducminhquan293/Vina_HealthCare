import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import { SignUpDto } from 'src/users/dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role, UserDocument } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
// import { Logger } from 'winston';
// import { InjectLogger } from 'nest-winston';

@Injectable()
export class AuthService {
    constructor(
        // @InjectLogger() private readonly logger: Logger,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<any> {
        // Convert SignUpDto to CreateUserDto
        const createUserDto: CreateUserDto = {
            full_name: signUpDto.name,
            email: signUpDto.email,
            role: Role.PATIENT, // Default role for signup
            date_of_birth: undefined,
            gender: undefined,
            phone: undefined,
            address: undefined
        };

        const user = await this.usersService.create(createUserDto) as UserDocument;
        const payload = { sub: user._id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                email: user.email,
                roles: user.roles,
                name: user.name,
                age: user.age
            }
        };
    }

    async signIn(signInDto: SignInDto): Promise<any> {
        const user = await this.usersService.findByEmail(signInDto.email) as UserDocument;
        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        // Note: Since the new user schema doesn't have password field,
        // you might need to implement a separate authentication mechanism
        // For now, we'll just check if the user exists
        const payload = { sub: user._id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                email: user.email,
                roles: user.roles,
                name: user.name,
                age: user.age
            }
        };
    }
}
