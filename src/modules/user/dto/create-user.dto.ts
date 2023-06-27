import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserTypeEnum } from '../../../enums/user-type.enum.js';
import { MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '../user.constant.js';

export default class CreateUserDto {
  @IsString({ message: 'Name is required' })
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, { message: `Name length must be from ${MIN_NAME_LENGTH} to ${MAX_NAME_LENGTH} symbols` })
  public name!: string;

  @IsEmail({}, { message: 'Email must be valid address' })
  public email!: string;

  @IsOptional()
  @IsEnum(UserTypeEnum, { message: 'User type must be \'base\' or \'pro\'' })
  public userType!: UserTypeEnum;

  @IsString({ message: 'Password is required' })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, { message: `Min length for password is ${MIN_PASSWORD_LENGTH}, max is ${MAX_PASSWORD_LENGTH}` })
  public password!: string;
}
