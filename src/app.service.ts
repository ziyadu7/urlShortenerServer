import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { User,UserDocument } from './Models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('user') private readonly userModel:Model<UserDocument>){}

  // Register user

  async Register(user:User){
    const newUser =  new this.userModel(user)
    return newUser.save()
  }

  // Login user

  async Login(user:User){
    const userExist = await this.userModel.findOne({username:user.username})
    if(userExist){
      return userExist
    }else{
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);      
    }
  }
}
