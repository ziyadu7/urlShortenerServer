import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { User,UserDocument } from './Models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AppService {
  constructor(@InjectModel('user') private readonly userModel:Model<UserDocument>){}

  // Register user

  async Register(user:User){
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(user.password,salt)
    user.password = password
    const newUser =  new this.userModel(user)
    return newUser.save()
  }

  // Login user

  async Login(user:User){
    const userExist = await this.userModel.findOne({username:user.username})
    const isMatch = await bcrypt.compare(user.password,userExist.password)
    if(isMatch){
      return userExist
    }else{
      throw new HttpException('User not found with password and username', HttpStatus.NOT_FOUND);      
    }
  }
}
