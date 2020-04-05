import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "./jwt-payload.interface";
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import * as config from 'config'

const jwtConfig = config.get("jwt");

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
        })
    }

    async  validate(payload : JwtPayload): Promise<User> {
        const {username} = payload;

        console.log(username);
        const user =  await this.userRepository.findOne({username});

        if(!user) {
            throw new UnauthorizedException("Not authorized");
        }
        return user;
    }
}
