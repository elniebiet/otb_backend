import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthSignUpDTO, AuthSignInDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    signUp(
        @Body() authCredentialDto: AuthSignUpDTO
    ): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(
        @Body() authSignInDTO: AuthSignInDTO
    ): Promise<{accessToken: string}> {
        return this.authService.signIn(authSignInDTO);
    }
}
