import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignUpDTO, AuthSignInDTO, AccessTokenDTO, PersonalDetailsDTO } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { OTB_User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(OTB_User)
        private usersRepository: Repository<OTB_User>,
        private jwtService: JwtService, // Assuming JwtService is injected for token generation
    ){}

    async signUp(authCredentialsDto: AuthSignUpDTO): Promise<{ message: string, statusCode: number }> {
        const { username, password, email, firstname, lastname } = authCredentialsDto;
        const user = this.usersRepository.create({ username, password, email, firstname, lastname });

        // Hash the password before saving
        // salt will be uniquely generated for each user
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        console.log("OTB_User to be saved:", user);

        try {
            await this.usersRepository.save(user);
            return { message: "success", statusCode: 201 };
        } catch (error) {
            // Handle unique constraint violation
            console.log('Error saving user:', error.code);
            if(error.code === '23505') {
                throw new ConflictException("Error saving user: Username or email already exists");
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authSignInDTO: AuthSignInDTO): Promise<{message: string, statusCode: number, accessToken: string}> {
        const { email, password, accessToken } = authSignInDTO;
        
        // invalid access token or no token, check login credentials
        const user = await this.usersRepository.findOne({ where: { email } });

        if (user && await bcrypt.compare(password, user.password)) {
            const payload: JwtPayload = { email };
            const accessToken: string = await this.jwtService.sign(payload);

            return { message: "success", statusCode: 201, accessToken }; // Return the access token
        } else {
            throw new ConflictException("Invalid credentials");
        }
    }

    async VerifyAccessToken(accessTokenDTO: AccessTokenDTO): Promise<{valid: number}> {
        const { email, accessToken } = accessTokenDTO;

        if(accessToken.length > 0)
        {
            try {
                const payload = await this.jwtService.verifyAsync(accessToken);
                if (payload.email === email) {
                    return { valid: 1 };
                }                 
            } catch (error) {
                // invalid access token
            }
        }

        return { valid: 0 };
    }

    async getPersonalDetails(accessTokenDTO: AccessTokenDTO): Promise<{statusCode: number, personalDetails: PersonalDetailsDTO}> {
        const { email, accessToken } = accessTokenDTO;

        if(accessToken.length > 0)
        {
            try {
                const payload = await this.jwtService.verifyAsync(accessToken);
                if (payload.email === email) {
                    const user = await this.usersRepository.findOne({ where: { email } });
                    if (user) {
                        const personalDetails: PersonalDetailsDTO = {
                            firstname: user.firstname,
                            lastname: user.lastname
                        };
                        return { statusCode: 200, personalDetails };
                    }
                }                 
            } catch (error) {
                // invalid access token
            }
        }

        const personalDetails: PersonalDetailsDTO = {
            firstname: "",
            lastname: ""
        };

        throw new NotFoundException(personalDetails);
    }
}
