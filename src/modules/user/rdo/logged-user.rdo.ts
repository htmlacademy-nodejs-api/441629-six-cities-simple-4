import { Expose } from 'class-transformer';

export default class LoggedUserRdo {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public token!: string;
}
