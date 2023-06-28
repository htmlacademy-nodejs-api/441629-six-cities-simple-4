import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserTypeEnum } from '../../../enums/user-type.enum.js';
import { UserConst } from '../user.constant.js';

export default class UpdateUserDto {
  @IsOptional()
  @Length(UserConst.MIN_NAME_LENGTH, UserConst.MAX_NAME_LENGTH, { message: `Name length must be from ${UserConst.MIN_NAME_LENGTH} to ${UserConst.MAX_NAME_LENGTH} symbols` })
  public name?: string;

  @IsOptional()
  @IsString({ message: 'Avatar path must be string' })
  public avatar?: string;

  @IsOptional()
  @IsEnum(UserTypeEnum, { message: 'User type must be \'base\' or \'pro\'' })
  public userType?: UserTypeEnum;
}
