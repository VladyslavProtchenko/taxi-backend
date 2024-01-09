import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from './models/user.model';
// import { Order } from './models/order.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env`: '.env'
    }),
    // SequelizeModule.forRoot({
    //     dialect: 'postgres',
    //     host: process.env.POSTGRES_HOST,
    //     port: Number(process.env.POSTGRES_PORT),
    //     username: process.env.POSTGRES_USER,
    //     password:  process.env.POSTGRES_PASSWORD,
    //     database:  process.env.POSTGRES_DB,
    //     autoLoadModels: true,
    //   }),
    // SequelizeModule.forFeature([User, Order]),
    OrderModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@taxi.azwgfbe.mongodb.net/orders'), 
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'vladyslav25cm@gmail.com',
          pass: 'bzwu xzdm hepc uqcj',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }), UsersModule, AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}



