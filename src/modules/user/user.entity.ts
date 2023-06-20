import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { UserType } from '../../types/user.type.js';
import { createSHA256 } from '../../core/helpers/index.js';
import { UserTypeEnum } from '../../enums/user-type.enum.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements UserType {
  @prop({ required: true, default: '' })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({
    required: false,
    enum: UserTypeEnum,
    default: UserTypeEnum.BASE,
  })
  public userType!: UserTypeEnum;

  @prop({ required: true, default: '' })
  public password?: string;

  constructor(userData: UserType) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
