import { Body, Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { userValidationDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() userDto:userValidationDto){
    return this.appService.Register(userDto)
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY}))
  async login(@Body() userDto:userValidationDto){
    return this.appService.Login(userDto)
  }
}
