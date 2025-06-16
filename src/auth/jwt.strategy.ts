import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ExtractJwt } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){
        super({
            ignoreExpiration: false, // Set to true if you want to ignore expiration
            secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey', // Use your secret key here
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.usersRepository.findOne({ where: { username } });

        if (!user) {
            // If user not found, throw an error
            throw new UnauthorizedException("User not found");
        }

        // Return the user object to be attached to the request
        return user;
    }
}