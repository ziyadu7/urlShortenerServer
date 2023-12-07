import {ValidationPipe,HttpStatus} from '@nestjs/common'

const usernameErrorMessage = 'Username is required'
const passwrodErrorMessage = 'Password is required'
const userValidation = new ValidationPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})

export const SETTINGS = {
    userValidation
}

export const MESSAGES = {
    usernameErrorMessage,
    passwrodErrorMessage
}