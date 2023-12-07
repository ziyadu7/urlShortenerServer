import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Models/user.model'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './app.utils';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://trendsetterfas:QgsOBVNkYO7ldPKw@cluster0.ufhsmk5.mongodb.net/urlShortener'),
            MongooseModule.forFeature([{name:'user',schema:UserSchema}]),
          JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
