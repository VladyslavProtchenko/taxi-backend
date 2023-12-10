import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop({ required: true })
    role: string;

    @Prop()
    phone: string;

    @Prop()
    orders: [string];

}

export const UserSchema = SchemaFactory.createForClass(User);
