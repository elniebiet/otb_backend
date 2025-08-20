import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthSignUpDTO, AuthSignInDTO, AccessTokenDTO, PersonalDetailsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    signUp(
        @Body() authCredentialDto: AuthSignUpDTO
    ): Promise<{message: string, statusCode: number}> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(
        @Body() authSignInDTO: AuthSignInDTO
    ): Promise<{message: string, statusCode: number, accessToken: string}> {
        return this.authService.signIn(authSignInDTO);
    }

    @Post('/atverify')
    verifyAccessToken(
        @Body() accessTokenDTO: AccessTokenDTO
    ): Promise<{valid: number}> {
        return this.authService.VerifyAccessToken(accessTokenDTO);
    }

    @Post('/personal_details')
    getPersonalDetails(
        @Body() accessTokenDTO: AccessTokenDTO
    ): Promise<{statusCode: number, personalDetails: PersonalDetailsDTO}> {
        return this.authService.getPersonalDetails(accessTokenDTO);
    }
}
