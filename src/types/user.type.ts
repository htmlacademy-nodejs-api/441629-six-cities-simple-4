import { UserTypeEnum } from '../enums/user-type.enum';

export type UserType = {
  name: string;
  email: string;
  avatar: string;
  userType: UserTypeEnum;
};
