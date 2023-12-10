import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDTO } from 'src/dto/user.dto';
import { User } from 'src/shcemas/user.schema';


@Injectable()
export class UsersService {

  constructor(@InjectModel("user") private userModel: Model<User>,) {}

  async create(user: userDTO) {
    return new this.userModel({...user}).save()
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async getUser(_id: string) {
    return this.userModel.findOne({_id}).exec();
  }

  async update(_id: string, userDto: userDTO) {
    return this.userModel.findOneAndUpdate({_id}, { userDto }).exec();
  }

  async delete(_id: string) {
    return this.userModel.findOneAndDelete({_id}).exec();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
