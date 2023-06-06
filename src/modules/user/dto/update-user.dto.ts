import { UserTypeEnum } from '../../../enums/user-type.enum.js';

export default class UpdateUserDto {
  public name!: string;
  public avatar!: string;
  public userType!: UserTypeEnum;
}
