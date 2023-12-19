import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDTO } from 'src/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor( 
            private  authService: AuthService,
        ){}

    @UsePipes(new ValidationPipe())
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Body() user: userDTO ) {
        return this.authService.login(user)
    }


    @UsePipes(new ValidationPipe())
    @Post('registration')
    registration(@Body() user: userDTO ) {
        return this.authService.registration(user)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }

}
