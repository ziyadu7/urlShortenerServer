import { IsNotEmpty,Length } from "class-validator";
import { MESSAGES } from "src/app.utils";

export class userValidationDto{

    @IsNotEmpty({message:MESSAGES.usernameErrorMessage})
    @Length(3,10)
    username:string;

    @IsNotEmpty({message:MESSAGES.passwrodErrorMessage})
    @Length(4,10)
    password:string
}