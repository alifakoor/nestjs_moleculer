import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Length(2, 100)
  @IsNotEmpty()
  firstname: string;

  @Length(2, 100)
  @IsNotEmpty()
  lastname: string;

  @Length(3, 50)
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsMobilePhone('fa-IR')
  phone: string;
}
