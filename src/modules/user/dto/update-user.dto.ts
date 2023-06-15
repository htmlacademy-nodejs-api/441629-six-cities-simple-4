import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserTypeEnum } from '../../../enums/user-type.enum.js';

export default class UpdateUserDto {
  @IsOptional()
  @Length(1, 15, { message: 'Name length must be from 1 to 15 symbols' })
  public name?: string;

  @IsOptional()
  @IsString({ message: 'Avatar path must be string' })
  public avatar?: string;

  @IsOptional()
  @IsEnum(UserTypeEnum, { message: 'User type must be \'base\' or \'pro\'' })
  public userType?: UserTypeEnum;
}
