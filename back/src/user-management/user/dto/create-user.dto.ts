import { IsEmail } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  password: string;

  role: string;

  society: string;

  url: string;

  apikey: string = null;
}
