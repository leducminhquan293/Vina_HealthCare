import { AuthService } from './auth.service';
import { SignUpDto } from 'src/users/dto/sign-up.dto';
import { SignInDto } from 'src/users/dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<any>;
    signIn(signInDto: SignInDto): Promise<any>;
}
