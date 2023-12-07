import { Body, Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { userValidationDto } from './dto/user.dto';
import { SETTINGS } from './app.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/register')
  @UsePipes(SETTINGS.userValidation)
  async register(@Body() userDto: userValidationDto) {
    return this.appService.Register(userDto)
  }

  @Post('/login')
  @UsePipes(SETTINGS.userValidation)
  async login(@Body() userDto: userValidationDto) {
    return this.appService.Login(userDto)
  }
}
