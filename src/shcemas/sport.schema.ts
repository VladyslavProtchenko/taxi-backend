import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Order } from './order.schema';


export type SportDocument = HydratedDocument<Sport>;

@Schema()
export class Sport {
    @Prop()
    title: string;

    @Prop()
    quantity: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
    orderId: Order;

}

export const SportSchema = SchemaFactory.createForClass(Sport);