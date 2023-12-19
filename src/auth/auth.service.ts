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
        if(!user) throw new UnauthorizedException('User not exists')
        
        if(await bcrypt.compare(password, user.password)) return user;
        throw new UnauthorizedException('Invalid password')
    } 

    async login(user: userDTO ) {
        const { _id, email, role } = user;
        return {
            _id, email,role, token: this.jwtService.sign({ _id: user._id, email: user.email, role: user.role})
        }
    }

    async registration(user: userDTO ) {
        const candidate = await this.userService.getUserByEmail(user.email)

        if(candidate) {
            throw new HttpException('User with this email already exists',HttpStatus.BAD_REQUEST )
        }
        const hashPassword = await bcrypt.hash(user.password, 5)
        const res = await this.userService.create({...user, password: hashPassword})
        
        return { res }
    }
}
