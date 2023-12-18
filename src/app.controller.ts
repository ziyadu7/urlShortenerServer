import { Body, Controller, Get, Delete, Post, UsePipes,Request,UseGuards, Param, Response } from '@nestjs/common';
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
    return this.appService.getUrls(req.user.sub)
  }

  @Get('/url')
  @UseGuards(AuthGuard)
  async redirectUrl(@Request() req,@Response() res:Response){
    return this.appService.redirectUrl(req.Params.shortenId,res)
  }



  @Delete('/deleteUrl/:urlId')
  @UseGuards(AuthGuard)
  async deleteUrl(@Param() url){
    return this.appService.deleteUrl(url.urlId)
  }

  @Post('/addUrl')
  @UseGuards(AuthGuard)
  @UsePipes(SETTINGS.urlValidation)
  async addUrl(@Request() req, @Body() urlDto:urlValidationDto){
    
    return this.appService.addUrl(urlDto,req.user.sub)
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
