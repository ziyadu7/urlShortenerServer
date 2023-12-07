import { IsNotEmpty, MinLength } from "class-validator";
import { MESSAGES } from "src/app.utils";

export class urlValidationDto{

    @IsNotEmpty({message:MESSAGES.urlErrorMessage})
    @MinLength(3, { message: "URL must be at least 3 characters" })
    url:string;
}