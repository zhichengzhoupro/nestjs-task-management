import {EntityRepository, Repository, UpdateResult} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as bycrypt from 'bcryptjs'
import {AuthUpdateDto} from "./dto/auth-update.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
        const {username, password} = authCredentialDto;

        const user: User = new User();
        user.username = username;
        user.salt = await bycrypt.genSalt();
        user.role = '003';
        user.displayName = 'test_user';
        user.password = await this.getHashPassword(password, user.salt);

        try {
            return await user.save()
        } catch (error) {
            if (parseInt(error.code) === 23505) {
                throw new ConflictException("User already exists")
            } else {
                throw new InternalServerErrorException();
            }

        }

    }

    async updateUserInfo(authUpdateDto: AuthUpdateDto): Promise<UpdateResult> {
        const {username, password, id, avatarUrl, displayName} = authUpdateDto;

        const user: User = new User();
        user.username = username;
        if(password) {
            user.salt = await bycrypt.genSalt();
            user.password = await this.getHashPassword(password, user.salt);
        }
        user.avatar = avatarUrl;
        user.displayName = displayName;

        return await this.update(id, user)


    }

    async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<User> {
        const {username, password} = authCredentialDto;
        const user = await this.findOne({username: username});
        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    async getHashPassword(password: string, salt: string) {
        return await bycrypt.hash(password, salt);
    }
}