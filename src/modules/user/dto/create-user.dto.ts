import { UserTypeEnum } from '../../../enums/user-type.enum';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar!: string;
  public userType!: UserTypeEnum;
  public password!: string;
}
