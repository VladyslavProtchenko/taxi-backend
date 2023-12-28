import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {

    @Column( {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;



    @Column( {type: DataType.STRING, allowNull:false })
    orderType: string;

    @Column( {type: DataType.STRING, allowNull:false })
    type: string;

    @Column( {type: DataType.STRING, allowNull:false })
    status: string;

    @Column( {type: DataType.STRING, allowNull:false })
    carType: string;

    @Column( {type: DataType.STRING, allowNull:false })
    tripType: string;

    @Column( {type: DataType.STRING, allowNull:false })
    paymentMethod: string;

    @Column( {type: DataType.STRING, allowNull:false })
    additionalText: string;

    @Column( {type: DataType.STRING, allowNull:false })
    isReturnTrip: string;

    @BelongsTo(()=> Order)
    order: Order;

    @ForeignKey(()=> Order)
    @Column
    orderId: number;


    @Column( {type: DataType.STRING, allowNull:false })
    name: string;
    @Column( {type: DataType.STRING, allowNull:true })
    name2: string;
    @Column( {type: DataType.STRING, allowNull:true })
    name3: string;

    @Column( {type: DataType.STRING, allowNull:false })
    email: string;
    @Column( {type: DataType.STRING, allowNull:true })
    email2: string;
    @Column( {type: DataType.STRING, allowNull:true })
    email3: string;



    @Column( {type: DataType.STRING, allowNull:false })
    phone: string;
    @Column( {type: DataType.STRING, allowNull:true })
    phone2: string;
    @Column( {type: DataType.STRING, allowNull:true })
    phone3: string;




    @ForeignKey(()=> User)
    @Column
    userId: number;

    @BelongsTo(()=> User)
    user: User;

}


// @Prop()
// isNow: boolean;
// @Prop()
// date: string;
// @Prop()
// time: string;

// @Prop()
// from: string;
// @Prop()
// to: string;

// @Prop({ type: Object, default: {} })
// stops: { [key: number]: string };

// @Prop({ type: Object, default: {} })
// flight: {
//     title: string;
//     prefix: string;
//     number: string;
// };

// @Prop({ type: Object, default: {} })
// flight2: {
//     title: string;
//     prefix: string;
//     number: string;
// };

// @Prop()
// departure: string;
// @Prop()
// departure2: string;

// @Prop()
// adults: number;
// @Prop()
// kids: number[];
// @Prop()
// babies: number;