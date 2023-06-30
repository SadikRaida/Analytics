import { IsEmail } from "class-validator";

export class CreateUserDto {
  username: string;

  @IsEmail()
  email: string;

  password: string;

  role: string;

  society: string;

  url: string;

  apikey: string = null;
}
