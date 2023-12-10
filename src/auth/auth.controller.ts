import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDTO } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {

    constructor( private  authService: AuthService) {

    }
    @UsePipes(new ValidationPipe())
    @Post('/login')
    login(@Body() userDto: userDTO ) {
        return this.authService.login(userDto)
    }
    @UsePipes(new ValidationPipe())
    @Post('/registration')
    registration(@Body() userDto: userDTO ) {
        return this.authService.registration(userDto)
    }

}
