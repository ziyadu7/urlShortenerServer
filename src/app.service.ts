import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { User,UserDocument } from './Models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Url, UrlDocument } from './Models/url.model';
import { urlValidationDto } from './dto/url.dto';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('user') private readonly userModel:Model<UserDocument>,
    @InjectModel('url') private readonly UrlModel:Model<UrlDocument>){}

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
      const token = await this.jwtService.signAsync({sub:userExist._id})  
      return {token}
    }else{
      throw new HttpException('User not found with password and username', HttpStatus.NOT_FOUND);      
    }
  }

  // Get urls


  // Add urls

  async addUrl(url:urlValidationDto){
    console.log(url);
    const urlExist = await this.UrlModel.findOne({url:url.url})
    if(urlExist){
      throw new HttpException('Url already decoded',HttpStatus.CONFLICT)
    }
  }
}
