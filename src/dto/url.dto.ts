import { IsNotEmpty,Length } from "class-validator";
import { MESSAGES } from "src/app.utils";

export class urlValidationDto{

    @IsNotEmpty({message:MESSAGES.usernameErrorMessage})
    @Length(3)
    url:string;
}