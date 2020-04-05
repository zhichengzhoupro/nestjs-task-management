import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import {User} from "./user.entity";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";
import {AuthResponseDto} from "./dto/auth-response.dto";
import {AuthUpdateDto} from "./dto/auth-update.dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    )
    {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<any> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<any> {
        const user: User = await this.userRepository.validateUserPassword(authCredentialDto);
        if(!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        const {id, username, avatar, displayName, role} = user;

        const authResponseDto: AuthResponseDto = {
            id,
            username,
            avatarUrl: avatar,
            displayName,
            role
        }



        const payload: JwtPayload = { username: user.username };
        const accessToken = this.jwtService.sign(payload);


        return {accessToken, userInfo: authResponseDto};
    }

    updateUserInfo(authUpdateDto: AuthUpdateDto) {
        return this.userRepository.updateUserInfo(authUpdateDto);
    }
}
