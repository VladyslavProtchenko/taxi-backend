import { IsEmail, MinLength } from "class-validator";

export class newUserDTO {
    @IsEmail()
    readonly email: string;

    @MinLength(6, {message: 'Six symbols minimum'})
    readonly password: string;

    readonly role: string;
    readonly name: string;
    readonly phone: string;
    readonly orders: string[];
}