import { IsString, MaxLength, MinLength, Matches } from "class-validator";

class AuthSignUpDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/, { 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' 
    }) // although typically this should be done in the frontend
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;
}

class AuthSignInDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/, { 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' 
    }) // although typically this should be done in the frontend
    password: string;
}

export { 
    AuthSignUpDTO,
    AuthSignInDTO,
 };