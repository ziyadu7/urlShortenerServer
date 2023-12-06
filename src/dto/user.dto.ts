import { IsNotEmpty,Length } from "class-validator";

export class userValidationDto{

    @IsNotEmpty({message:"Username is required"})

    @Length(3,10)
    username:string;

    @IsNotEmpty()
    @Length(3,10)
    password:string
}