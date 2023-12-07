import {JwtModuleOptions} from '@nestjs/jwt'

export const jwtConfig:JwtModuleOptions = {
    secret: process.env.JWTSECRET,
    signOptions: { expiresIn: '1d' }
}