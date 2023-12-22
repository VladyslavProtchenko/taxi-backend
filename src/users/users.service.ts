import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { newUserDTO } from 'src/dto/new-user.dto';
import { userDTO } from 'src/dto/user.dto';
import { User } from 'src/shcemas/user.schema';


@Injectable()
export class UsersService {

  constructor(@InjectModel("user") private userModel: Model<User>,) {}

  async create(user: newUserDTO) {
    return new this.userModel({...user}).save()
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async getUser(_id: Types.ObjectId) {
    return this.userModel.findOne({_id}).exec();
  }

  async update(_id: Types.ObjectId, data: userDTO) {
    return this.userModel.findOneAndUpdate({_id}, { data }).exec();
  }

  async setAndUpdate (_id: Types.ObjectId, data: userDTO ) {
    const options = {
      new: true, // Return the modified document rather than the original
      upsert: true, // If the document doesn't exist, insert it
      setDefaultsOnInsert: true, // Set default values when upserting
    }
    return this.userModel.findOneAndUpdate({_id}, data, options).exec();
  }

  async delete(_id: Types.ObjectId) {
    return this.userModel.findOneAndDelete({_id}).exec();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
