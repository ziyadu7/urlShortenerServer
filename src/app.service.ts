import { Injectable } from '@nestjs/common';
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
}
