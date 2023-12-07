import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Models/user.model'
import { JwtModule } from '@nestjs/jwt';
import { UrlSchema } from './Models/url.model';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.MONGOOSECONNECTION,
    })
  }),
  MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'url', schema: UrlSchema }]),
  JwtModule.registerAsync(
    jwtConfig
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
