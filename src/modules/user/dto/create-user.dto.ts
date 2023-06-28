import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserTypeEnum } from '../../../enums/user-type.enum.js';
import { UserConst } from '../user.constant.js';

export default class CreateUserDto {
  @IsString({ message: 'Name is required' })
  @Length(UserConst.MIN_NAME_LENGTH, UserConst.MAX_NAME_LENGTH, { message: `Name length must be from ${UserConst.MIN_NAME_LENGTH} to ${UserConst.MAX_NAME_LENGTH} symbols` })
  public name!: string;

  @IsEmail({}, { message: 'Email must be valid address' })
  public email!: string;

  @IsOptional()
  @IsEnum(UserTypeEnum, { message: 'User type must be \'base\' or \'pro\'' })
  public userType!: UserTypeEnum;

  @IsString({ message: 'Password is required' })
  @Length(UserConst.MIN_PASSWORD_LENGTH, UserConst.MAX_PASSWORD_LENGTH, { message: `Min length for password is ${UserConst.MIN_PASSWORD_LENGTH}, max is ${UserConst.MAX_PASSWORD_LENGTH}` })
  public password!: string;
}
