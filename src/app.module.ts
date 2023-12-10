import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
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



