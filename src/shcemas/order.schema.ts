// taxi.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { raw } from 'mysql2';


export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order  {
    @Prop()
    orderType: string;
    @Prop()
    type: string;
    @Prop()
    status: string;
    @Prop()
    carType: string;
    @Prop()
    tripType: string;
    @Prop()
    paymentMethod: string;
    @Prop()
    additionalText: string;
    @Prop()
    isReturnTrip: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
    orderId: Order;

    @Prop()
    name: string;
    @Prop()
    name2: string;
    @Prop()
    name3: string;


    @Prop()
    title: string;
    @Prop()
    title2: string;
    @Prop()
    title3: string;


    @Prop()
    email: string;
    @Prop()
    email2: string;
    @Prop()
    email3: string;


    @Prop()
    phone: string;
    @Prop()
    phone2: string;
    @Prop()
    phone3: string;
    

    @Prop()
    isNow: boolean;
    @Prop()
    date: string;
    @Prop()
    time: string;

    @Prop()
    from: string;
    @Prop()
    to: string;

    @Prop({ type: Object, default: {} })
    stops: { [key: number]: string };

    @Prop({ type: Object, default: {} })
    flight: {
        title: string;
        prefix: string;
        number: string;
    };

    @Prop({ type: Object, default: {} })
    flight2: {
        title: string;
        prefix: string;
        number: string;
    };

    @Prop()
    departure: string;
    @Prop()
    departure2: string;

    @Prop()
    adults: number;
    @Prop()
    kids: number[];
    @Prop()
    babies: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);