import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { userDTO } from 'src/dto/user.dto';
import { registrationDto } from 'src/dto/registration.dto';
import { newUserDTO } from 'src/dto/new-user.dto';


@Injectable()
export class AuthService {

    constructor(
            private userService:UsersService,
            private jwtService:JwtService,
        ){}

    async validateUser( email: string, password: string) {
        return await this.userService.getUserByEmail(email);
    } 

    async login(data:{ email:string, password:string} ) {
        const {  email, password } = data;
        const user = await this.userService.getUserByEmail(email);

        if(!user) return { text: 'user not exist', status: 404 }
        if( user.role === 'guest') return  { text: 'User nor registered', status: 403 }
        if(await bcrypt.compare(password, user.password)) return { status: 201, text: 'login is success', email, token: this.jwtService.sign({ email, password }) }
        return { text: 'Wrong password', status: 401 }
    }
    
    async registration(user: registrationDto ) {
        
        const candidate = await this.userService.getUserByEmail(user.email)
        const hashPassword = await bcrypt.hash(user.password, 5)
        
        //check if user exists
        if(candidate &&  candidate.role && candidate.role !== 'guest' ) return { status: 409, text: 'User already exists'}

        //check if user have orders history
        if(candidate && (candidate.role ==='guest')) {
        
            const newUser:userDTO = {
                phone: user.phone || candidate.phone,
                email:candidate.email,
                password:hashPassword,
                name:user.name || candidate.name,
                role: 'user',
                orders:candidate.orders
            }
            
            //check if user have a role
            const res =  await this.userService.setAndUpdate(candidate._id, newUser)
            return  { status: 201, text: 'created', data: res }
        }

        const newUser: newUserDTO = {
            ...user,
            password: hashPassword,
            role: 'user',
            orders:[]
        }

        const res = await this.userService.create(newUser)

        return {status: 201, text: 'created', data: res }
    }
}
