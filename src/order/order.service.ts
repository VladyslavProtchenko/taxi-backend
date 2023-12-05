import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "src/shcemas/order.schema";
import { Baggage } from "src/shcemas/baggage.schema";
import { Pets } from "src/shcemas/pets.schema";
import { Seats } from "src/shcemas/seats.schema";
import { Sport } from "src/shcemas/sport.schema";
import {  MailerService } from '@nestjs-modules/mailer';
import ical from 'ical-generator'
import * as moment from 'moment';
import { CreateTaxiDTO } from "src/dto/taxi.dto";

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('order') private orderModel: Model<Order>, 
        @InjectModel('baggage') private bagModel: Model<Baggage>,
        @InjectModel('pets') private petsModel: Model<Pets>,
        @InjectModel('seats') private seatsModel: Model<Seats>,
        @InjectModel('sport') private sportModel: Model<Sport>,
        private readonly mailerService: MailerService,
        ) {}



    async create(data: CreateTaxiDTO[]) {

        
        const emails:{[key:string]: CreateTaxiDTO[]} = {}
        
        //map each car and make different functions
        data.map((item,index)=>{

            // //Create all database records, filter with zero quantity and create_________________________________________________________
            const createdOrder = new this.orderModel({ status: 'active', ...item })
            item.baggage.filter(item=> item.quantity).map( item => new this.bagModel({ ...item, orderId: createdOrder.id }).save())
            item.carSeats.filter(item=> item.quantity).map(item => new this.seatsModel({ ...item, orderId: createdOrder.id }).save())
            item.sport.filter(item=> item.quantity).map(item => new this.sportModel({ ...item, orderId: createdOrder.id }).save())
            item.pets.filter(item=> item.quantity).map(item =>new this.petsModel({ ...item, orderId: createdOrder.id }).save())
            createdOrder.save()

            const calendar = ical({name: 'My Order'})
            const parsedDate = moment(item.date +" "+ item.time , 'MM/DD/YYYY HH:mm');
            calendar.createEvent({
                start: new Date(parsedDate.toLocaleString()),
                end: new Date(parsedDate.add(1, 'hour').toLocaleString()),
                summary: `taxi #${index}`,
                description: `You ordered beautiful taxi ${index}`,
                location: 'you soul'
            })

            this.mailerService.sendMail({
                to: item[0].email,
                from: "AndriiIlkiv@gmail.com",
                subject: "test emails",
                text: "Hi Malek, this is the test email",
                attachments: [
                    {
                        filename: "event.ics",
                        content: calendar.toString(),
                        method: "REQUEST",
                    },
                ],
            });

        })

        // Object.values(emails).map(item=>{
        //     const calendar = ical({name: 'My Order'})

        //     item.map((car,index) => {
        //         const parsedDate = moment(car.date +" "+ car.time , 'MM/DD/YYYY HH:mm');

        //         calendar.createEvent({
        //             start: new Date(parsedDate.toLocaleString()),
        //             end: new Date(parsedDate.add(1, 'hour').toLocaleString()),
        //             summary: `taxi #${index}`,
        //             description: `You ordered beautiful taxi ${index}`,
        //             location: 'you soul'
        //         })
        //     })

            
        //     this.mailerService.sendMail({
        //         to: item[0].email,
        //         from: "AndriiIlkiv@gmail.com",
        //         subject: "test emails",
        //         text: "Hi Malek, this is the test email",
        //         attachments: [
        //             {
        //                 filename: "event.ics",
        //                 content: calendar.toString(),
        //                 method: "REQUEST",
        //             },
        //         ],
        //     });

        // })

        // console.log(emails)

        return {status: 200, text: 'working mazafaka'}
    }
}
