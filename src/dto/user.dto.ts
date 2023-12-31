import { IsEmail, IsOptional, MinLength } from "class-validator";
import { Types } from "mongoose";

export class userDTO {
    @IsEmail()
    readonly email: string;

    @MinLength(6, {message: 'Six symbols minimum'})
    readonly password: string;
    readonly _id?: Types.ObjectId;
    readonly role: string;
    readonly name: string;
    readonly phone: string;
    readonly orders: string[];
}