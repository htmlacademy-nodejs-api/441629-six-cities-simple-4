import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserTypeEnum } from '../../../enums/user-type.enum.js';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '../user.constant.js';

export default class UpdateUserDto {
  @IsOptional()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, { message: `Name length must be from ${MIN_NAME_LENGTH} to ${MAX_NAME_LENGTH} symbols` })
  public name?: string;

  @IsOptional()
  @IsString({ message: 'Avatar path must be string' })
  public avatar?: string;

  @IsOptional()
  @IsEnum(UserTypeEnum, { message: 'User type must be \'base\' or \'pro\'' })
  public userType?: UserTypeEnum;
}
