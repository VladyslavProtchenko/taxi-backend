// taxi.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order  {
    @Prop()
    type: string;

    @Prop()
    status: string;

    @Prop()
    timeType: number;

    @Prop()
    timeTypeR: number;


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
    date: string;

    @Prop()
    time: string;

    @Prop()
    dateNow: boolean;

    @Prop()
    from: string;

    @Prop()
    to: string;

    @Prop({ type: { type: String } })
    stops: { [key: number]: string };

    @Prop()
    icon: number;

    @Prop()
    icon2: number;

    @Prop({type: { type: String}})
    flight: {
        title: string;
        prefix: string;
        number: string;
    };

    @Prop({type: { type: String}})
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
    tripType: string;

    @Prop()
    paymentMethod: string;

    @Prop()
    additionalText: string;

    @Prop()
    isReturnTrip: boolean;

    @Prop()
    fromR: string;

    @Prop()
    toR: string;

    @Prop({ type: { type: String } })
    stopsR: { [key: number]: string };

    @Prop()
    dateR: string;

    @Prop()
    timeR: string;

    @Prop()
    iconR: number;

    @Prop()
    icon2R: number;

    @Prop({type: { type: String}})
    flightR: {
        title: string;
        prefix: string;
        number: string;
    };

    @Prop({type: { type: String}})
    flight2R: {
        title: string;
        prefix: string;
        number: string;
    };

    @Prop()
    departureR: string;

    @Prop()
    departure2R: string;

    @Prop()
    carType: string;

    @Prop()
    adults: number;

    @Prop()
    kids: number[];

    @Prop()
    babies: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);