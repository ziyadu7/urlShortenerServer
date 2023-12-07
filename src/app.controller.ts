import { Body, Controller, Get, HttpStatus, Post, UsePipes,Request,UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { userValidationDto } from './dto/user.dto';
import { SETTINGS } from './app.utils';
import { AuthGuard } from './auth.guard'
import { urlValidationDto } from './dto/url.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @Get('/')
  @UseGuards(AuthGuard)
  async getUrls(@Request() req){
    console.log('daadada');
    
    return req.user
  } 

  @Post('/addUrl')
  @UseGuards(AuthGuard)
  @UsePipes()
  async addUrl(@Body() urlDto:urlValidationDto){
    return this.appService
  }

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
