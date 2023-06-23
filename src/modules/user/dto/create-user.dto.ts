import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserTypeEnum } from '../../../enums/user-type.enum.js';

export default class CreateUserDto {
  @IsString({ message: 'Name is required' })
  @Length(1, 15, { message: 'Name length must be from 1 to 15 symbols' })
  public name!: string;

  @IsEmail({}, { message: 'Email must be valid address' })
  public email!: string;

  @IsOptional()
  @IsEnum(UserTypeEnum, { message: 'User type must be \'base\' or \'pro\'' })
  public userType!: UserTypeEnum;

  @IsString({ message: 'Password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public password!: string;
}
