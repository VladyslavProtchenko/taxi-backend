import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Order } from './order.schema';


export type PetsDocument = HydratedDocument<Pets>;

@Schema()
export class Pets {
    @Prop()
    title: string;

    @Prop()
    quantity: number;

    @Prop()
    isOther: boolean;   
    
    @Prop()
    cage: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
    orderId: Order;

}

export const PetsSchema = SchemaFactory.createForClass(Pets);