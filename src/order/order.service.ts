import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderDTO } from "../dto/order.dto";
import { Order } from "src/shcemas/order.schema";
import { Baggage } from "src/shcemas/baggage.schema";
import { Pets } from "src/shcemas/pets.schema";
import { Seats } from "src/shcemas/seats.schema";
import { Sport } from "src/shcemas/sport.schema";
import {  MailerService } from '@nestjs-modules/mailer';
import ical from 'ical-generator'
import * as moment from 'moment';

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



    async create(createOrderDTO: CreateOrderDTO) {

        //map each car and make different functions
        createOrderDTO.cars.map(item=>{

            //Create all database records, filter with zero quantity and create_________________________________________________________
            const createdOrder = new this.orderModel({ status: 'active', ...item })
            item.baggage.filter(item=> item.quantity).map( item => new this.bagModel({ ...item, orderId: createdOrder.id }).save())
            item.carSeats.filter(item=> item.quantity).map(item => new this.seatsModel({ ...item, orderId: createdOrder.id }).save())
            item.sport.filter(item=> item.quantity).map(item => new this.sportModel({ ...item, orderId: createdOrder.id }).save())
            item.pets.filter(item=> item.quantity).map(item =>new this.petsModel({ ...item, orderId: createdOrder.id }).save())
            createdOrder.save()

            const parsedDate = moment(item.date +" "+ item.time , 'DD/MM/YYYY HH:mm');
            console.log(parsedDate.toISOString())
            //create event for ICalendar________________________________________________________________________________________________
            function createICalEvent(){
                const calendar = ical({name: 'My Event'})
                calendar.createEvent({
                    start: new Date(parsedDate.toISOString()),
                    end: new Date(parsedDate.add(1, 'hour').toISOString()),
                    summary: 'Taxi',
                    description: 'You ordered beautiful taxi',
                    location: 'you soul'
                })
                return calendar;
            }
            
            const calendar = createICalEvent()

            

            //Send email__________________________________________________________________________________________________________________
            this.mailerService.sendMail({
                to: item.email || 'test@gmail.com',
                from: "vladyslav25cm@gmail.com",
                subject: "test emails",
                text: "Hi Malek, this is the test email",
                // html: "<b>fuck you, Bitch!</b>",
                attachments: [
                    {
                        filename: "event.ics",
                        content: calendar.toString(),
                        method: "REQUEST",
                    },
                ],
            });
        })
    }
}
