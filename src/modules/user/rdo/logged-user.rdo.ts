import { Expose } from 'class-transformer';

export default class LoggedUserRdo {
  @Expose()
  public email!: string;

  @Expose()
  public token!: string;
}
