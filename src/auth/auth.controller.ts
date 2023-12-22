import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { registrationDto } from 'src/dto/registration.dto';

@Controller('auth')
export class AuthController {

    constructor( private  authService: AuthService ){}

    @Post('login')
    login(@Body() user: { email:string; password:string} ) {
        return this.authService.login(user)
    }

    @Post('registration')
    registration(@Body() user: registrationDto ) {
        return this.authService.registration(user)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }

}
