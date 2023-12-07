import {JwtModuleAsyncOptions} from '@nestjs/jwt'

export const jwtConfig:JwtModuleAsyncOptions = {
    useFactory:()=>{
        return {
            global: true,
            secret: process.env.JWTSECRET,
            signOptions: { expiresIn: '1d' }
        }
    }
}