import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Models/user.model'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './app.utils';
import { UrlSchema } from './Models/url.model';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://trendsetterfas:QgsOBVNkYO7ldPKw@cluster0.ufhsmk5.mongodb.net/urlShortener'),
            MongooseModule.forFeature([{name:'user',schema:UserSchema}]),
            MongooseModule.forFeature([{name:'url',schema:UrlSchema}]),
          JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' }
          })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
