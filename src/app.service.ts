import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { User,UserDocument } from './Models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UrlDocument } from './Models/url.model';
import { urlValidationDto } from './dto/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('user') private readonly userModel:Model<UserDocument>,
    @InjectModel('url') private readonly UrlModel:Model<UrlDocument>){}

  // Register user

  async Register(user:User){
    const isExist = await this.userModel.findOne({username:user.username})
    if(isExist){
      throw new HttpException('User already registered',HttpStatus.CONFLICT)
    }else{
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hash(user.password,salt)
      user.password = password
      const newUser =  new this.userModel(user)
      return newUser.save()
    }
  }

  // Login user

  async Login(user:User){
    const userExist = await this.userModel.findOne({username:user.username})
    if(userExist){
      const isMatch = await bcrypt.compare(user.password,userExist.password)
      if(isMatch){
        const token = await this.jwtService.signAsync({sub:userExist._id})  
        return {token}
      }else{
        throw new HttpException('User not found with password and username', HttpStatus.NOT_FOUND);      
      }
    }else{
      throw new HttpException('User not found', HttpStatus.NOT_FOUND); 
    }
  }

  // Get urls

  async getUrls(userId:String){
        
    const urls = await this.UrlModel.find({userId})
    
    return {urls}
  }

  // redirect Url

    async redirectUrl(shortenId:String, res){
        
      const url = await this.UrlModel.findOne({shortenId})
    
      return res.redirect(url.shortenUrl)
    }

  // Delte urls

  async deleteUrl(urlId:String){
    
    await this.UrlModel.deleteOne({_id:urlId})
    return {message:'Url removed successfully'}
  }

  // Add urls

  async addUrl(url:urlValidationDto,userId){
    if (!isURL(url.url)) {
      throw new HttpException('Enter a valid url',HttpStatus.BAD_REQUEST)
    }
    const urlExist = await this.UrlModel.findOne({$and:[{url:url.url},{userId}]})
    if(urlExist){
      throw new HttpException('Url already decoded',HttpStatus.CONFLICT)
    }else{
      const urlCode = nanoid(10);

      const shortenedUrl = `${process.env.BASEURL}/${urlCode}`

      await this.UrlModel.create({
        userId,
        url:url.url,
        shortenUrl:shortenedUrl,
        shortenId:urlCode
      })

      return {message:'Url shortened successfully'}
    }
  }
}
