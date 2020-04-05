import {Body, Controller, Post, Put, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import {User} from "./user.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get-user.decorator";
import {AuthUpdateDto} from "./dto/auth-update.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    )
    {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<User>{
        console.log(authCredentialDto);
        return this.authService.signUp(authCredentialDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<any>{
        console.log(authCredentialDto);
        return this.authService.signIn(authCredentialDto)
    }

    @Post('/user')
    @UseGuards(AuthGuard())
    getUserInfo(@GetUser() req:User) {
        return req;
    }

    @Put('/user')
    @UseGuards(AuthGuard())
    updateUserInfo(@Body(ValidationPipe)authUpdateDto: AuthUpdateDto) {
        console.log(authUpdateDto);
        return this.authService.updateUserInfo(authUpdateDto)
    }

}
