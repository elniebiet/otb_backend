import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.usersRepository.create({ username, password });

        // Hash the password before saving
        // salt will be uniquely generated for each user
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        console.log("User to be saved:", user);

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
}
