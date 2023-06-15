import { Expose, Type } from 'class-transformer';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import CityRdo from '../../city/rdo/city.rdo.js';

export default class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  @Type(() => CityRdo)
  public city!: CityRdo;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferTypeEnum;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}
