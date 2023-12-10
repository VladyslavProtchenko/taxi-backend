import {  HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { userDTO } from 'src/dto/user.dto';
import { User } from 'src/shcemas/user.schema';


@Injectable()
export class AuthService {

    constructor(
            private userService:UsersService,
            private jwtService:JwtService,
        ){}

    async validateUser( email: string, password: string) {

        const user = await this.userService.getUserByEmail(email);
        const hashPass = await bcrypt.hash(password, 5)

        if(user && user.password === hashPass) return user;

        throw new UnauthorizedException('Invalid password ')
    } 

    async login(userDto: userDTO ) {
        
    }

    async registration(userDto: userDTO ) {
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if(candidate) {
            throw new HttpException('User with this email already exists',HttpStatus.BAD_REQUEST )
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        
        const user = await this.userService.create({...userDto, password: hashPassword})
        
        return { user }
    }

    async generateToken(user: User){
        const payload = {}

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
