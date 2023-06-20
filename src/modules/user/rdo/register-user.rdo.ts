import { Expose } from 'class-transformer';

export default class RegisterUserRdo {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public userType!: string;

  @Expose()
  public token!: string;
}
