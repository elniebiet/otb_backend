import { IsString, MaxLength, MinLength, Matches } from "class-validator";
import { Unique } from "typeorm";

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

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    firstname: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    lastname: string;

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

    @IsString()
    @MinLength(0)
    @MaxLength(500)
    accessToken: string;
}

class AccessTokenDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(0)
    @MaxLength(500)
    accessToken: string;
}

class PersonalDetailsDTO {
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    firstname: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    lastname: string;
}

export { 
    AuthSignUpDTO,
    AuthSignInDTO,
    AccessTokenDTO,
    PersonalDetailsDTO,
 };