import { IsEmail, MinLength } from "class-validator";

export class userDTO {
    @IsEmail()
    readonly email: string;

    @MinLength(6, {message: 'Six symbols minimum'})
    readonly password: string;

    readonly _id: string;
    readonly role: string;
    readonly name: string;    
    readonly phone: string;
    readonly orders: [string];
}