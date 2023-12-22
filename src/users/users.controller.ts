import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDTO } from 'src/dto/user.dto';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() user: userDTO) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: Types.ObjectId) {
    return this.usersService.getUser(_id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: Types.ObjectId, @Body() user: userDTO) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: Types.ObjectId) {
    return this.usersService.delete(id);
  }
}
