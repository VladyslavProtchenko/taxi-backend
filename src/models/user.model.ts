
// import { Column, DataType, HasMany, Table, Model } from "sequelize-typescript";
// import { Order } from "./order.model";

// interface UserCreationAttrs {
//     email: string;
// }

// @Table({ tableName: 'users' })
// export class User extends Model<User, UserCreationAttrs> {

//     @Column( {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
//     id: number;

//     @Column({type: DataType.STRING, unique: true, allowNull: false })
//     email: string;

//     @Column({type: DataType.STRING, allowNull: true })
//     password: string; 

//     @Column({type: DataType.STRING, allowNull: true })
//     name: string;

//     @Column({type: DataType.STRING, allowNull: true })
//     phone: string;

//     @Column({type: DataType.STRING, defaultValue: 'GUEST', allowNull: true })
//     role: string;

//     @HasMany(()=> Order)
//     orders: Order[];
// }