import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import { SignUpDto } from 'src/users/dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
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
        const user = await this.usersService.create(signUpDto);
        const payload = { sub: user._id, email: user.email, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signIn(signInDto: SignInDto): Promise<any> {
        const user = await this.usersService.findByEmail(signInDto.email);
        if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        const payload = { sub: user._id, email: user.email, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
