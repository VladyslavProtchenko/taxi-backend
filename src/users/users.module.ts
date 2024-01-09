import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/shcemas/user.schema';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from 'src/models/user.model';
// import { Order } from 'src/models/order.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema }
    ]),
    // SequelizeModule.forFeature([User, Order])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
