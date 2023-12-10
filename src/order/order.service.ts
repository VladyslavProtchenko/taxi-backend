import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "src/shcemas/order.schema";
import { Baggage } from "src/shcemas/baggage.schema";
import { Pets } from "src/shcemas/pets.schema";
import { Seats } from "src/shcemas/seats.schema";
import { Sport } from "src/shcemas/sport.schema";
import { MailerService } from "@nestjs-modules/mailer";
import ical from "ical-generator";
import * as moment from "moment";
import { TaxiDTO } from "src/dto/taxi.dto";
import { User } from "src/shcemas/user.schema";
import { emailTemplate } from "./emailTemplate";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel("order") private orderModel: Model<Order>,
        @InjectModel("baggage") private bagModel: Model<Baggage>,
        @InjectModel("pets") private petsModel: Model<Pets>,
        @InjectModel("seats") private seatsModel: Model<Seats>,
        @InjectModel("sport") private sportModel: Model<Sport>,
        @InjectModel("user") private userModel: Model<User>,
        private readonly mailerService: MailerService
    ) {}

    async create(data: TaxiDTO[]) {
        const groupedOrders:{[key:string]:TaxiDTO[]} = {}
        const users = [];
        const orders = [];
        const responses = [];

        //Group orders by email address
        for await (const order of data) { groupedOrders[order.email] = groupedOrders[order.email]? [...groupedOrders[order.email],order] : [order] }
        
        for await(const em of Object.values(groupedOrders)) {


            for await (const item of em) {
                const order = await new this.orderModel({...item, status: "open", orderType:item.type, type: 'one-way' ,});

            //Create all database records, filter with zero quantity and create_________________________________________________________
                item.baggage.filter((item) => item.quantity).map((item) =>new this.bagModel({...item,orderId: order.id,}).save());
                item.carSeats.filter((item) => item.quantity).map((item) =>new this.seatsModel({...item,orderId: order.id, }).save());
                item.sport.filter((item) => item.quantity).map((item) =>new this.sportModel({...item,orderId: order.id,}).save());
                item.pets.filter((item) => item.quantity).map((item) =>new this.petsModel({...item,orderId: order.id,}).save());
                await order.save();

                console.log(order, "created order");

            //create or update user________________________________________________________________________________________________________
                const isUser = await this.userModel.findOne({ email: item.email });
                let user = null;
                if (!isUser) {
                    user = await new this.userModel({
                        email: item.email,
                        phone: item.phone,
                        name: item.name,
                        orders: [order.id],
                    }).save();
                    console.log(user, "new user created ");
                } else {
                    await this.userModel.findOneAndUpdate({ _id: isUser._id }, { orders: [...isUser.orders, order.id] });
                    user = await this.userModel.findOne({ _id: isUser._id });
                    console.log(user, "user updated ");
                }

                users.push(user, 'user');


                if(item.isReturnTrip) {
                    const returnOrder = await new this.orderModel({
                        ...item,
                        status: "open",
                        type: 'return',
                        orderType:item.type,
                        date: item.dateR,
                        time: item.timeR,
                        from: item.fromR,
                        to: item.toR,
                        flight: item.flightR,
                        flight2: item.flight2R,
                        stops: item.stopsR,
                        departure: item.departureR,
                        departure2: item.departure2R,
                        dateNow: false,
                        orderId: order._id,
                    });

                    //Create all database records, filter with zero quantity and create_________________________________________________________
                    item.baggage.filter((item) => item.quantity).map((item) =>new this.bagModel({...item,orderId: returnOrder.id,}).save());
                    item.carSeats.filter((item) => item.quantity).map((item) =>new this.seatsModel({...item,orderId: returnOrder.id, }).save());
                    item.sport.filter((item) => item.quantity).map((item) =>new this.sportModel({...item,orderId: returnOrder.id,}).save());
                    item.pets.filter((item) => item.quantity).map((item) =>new this.petsModel({...item,orderId: returnOrder.id,}).save());
                    await returnOrder.save();
        
                    console.log(returnOrder, "created return order");

                    await this.userModel.findOneAndUpdate({ _id: user._id }, { orders: [...user.orders, returnOrder.id] });
                    user = await this.userModel.findOne({ _id: user._id });
                    console.log(user, "return user updated ");
                }
            
                const calendarEvents = []
            //create new iCalendar event _______________________________________________________________________________________________
                const calendar = ical({ name: "one way order" });
                const parsedDate = moment(item.date + " " + item.time,"MM/DD/YYYY HH:mm");

                calendar.createEvent({
                    start: new Date(parsedDate.toLocaleString()),
                    end: new Date(parsedDate.add(1, "hour").toLocaleString()),
                    summary: `You order new taxi`,
                    description: `You ordered beautiful taxi}`,
                    location: "you soul",
                });
            
                calendarEvents.push({
                        filename: "event.ics",
                        content: calendar.toString(),
                        method: "REQUEST",
                })
            
                if(item.isReturnTrip) {
                    const calendar = ical({ name: "return order" });
                    const parsedDate = moment(item.dateR + " " + item.timeR,"MM/DD/YYYY HH:mm");

                    calendar.createEvent({
                        start: new Date(parsedDate.toLocaleString()),
                        end: new Date(parsedDate.add(1, "hour").toLocaleString()),
                        summary: `You order new taxi`,
                        description: `You ordered beautiful taxi}`,
                        location: "you soul",
                    });
                
                    calendarEvents.push({
                            filename: "event.ics",
                            content: calendar.toString(),
                            method: "REQUEST",
                    })
                }
                
            //Send email ________________________________________________________________________________________________________________
                const emailText = emailTemplate(item.email, (item.time + ' '+ item.date), user._id)
                const mailResponses = await this.mailerService.sendMail({
                    to: item.email,
                    from: "AndriiIlkiv@gmail.com",
                    subject: "test emails",
                    html: emailText,
                    attachments: calendarEvents,
                });

                console.log(mailResponses,'mail response');
                responses.push(mailResponses);
            
            }
        }
        

        return {
            users: users,
            responses: responses,
            orders: orders,
        };
    }

    async getOrders() {
        return this.orderModel.find().exec();
    }

    async getOrder(id: string) {
        return this.orderModel.findOne({'_id':id}).exec();
    }

    async updateStatus(id: string, status) {
        
        return this.orderModel.findOneAndUpdate({'_id':id},{status: status}).exec();
    }
    async updateOrder(id: string, order) {
        return this.orderModel.findOneAndUpdate({'_id':id},{...order}).exec();
    }
}

