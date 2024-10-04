import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
  //@IsNotEmpty
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}