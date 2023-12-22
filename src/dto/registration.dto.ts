import { IsEmail, MinLength } from "class-validator";

export class registrationDto {
    @IsEmail()
    readonly email: string;
    @MinLength(8, {message: '8 symbols minimum'})
    readonly password: string;

    readonly name: string;
    readonly phone: string;
}