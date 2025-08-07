import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
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

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, email} = authCredentialsDto;
        const user = this.usersRepository.create({ username, password, email });

        // Hash the password before saving
        // salt will be uniquely generated for each user
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        console.log("OTB_User to be saved:", user);

        try {
            await this.usersRepository.save(user);
        } catch (error) {
            // Handle unique constraint violation
            console.log('Error saving user:', error.code);
            if(error.code === '23505') {
                throw new ConflictException("Error saving user: Username already exists");
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { email, username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (user && await bcrypt.compare(password, user.password)) {
            const payload: JwtPayload = { email };
            const accessToken: string = await this.jwtService.sign(payload);

            return { accessToken }; // Return the access token
            // return "Login successful";
        } else {
            throw new ConflictException("Invalid credentials");
        }
    }
}
