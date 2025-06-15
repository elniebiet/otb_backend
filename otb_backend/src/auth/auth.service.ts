import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.usersRepository.create({ username, password });

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
