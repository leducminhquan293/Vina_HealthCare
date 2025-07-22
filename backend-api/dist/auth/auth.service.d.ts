import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import { SignUpDto } from 'src/users/dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<any>;
    signIn(signInDto: SignInDto): Promise<any>;
}
