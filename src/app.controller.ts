import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './Models/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(@Body() userDto:User){
    return this.appService.Register(userDto)
  }
}
