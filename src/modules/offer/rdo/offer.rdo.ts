import { Expose } from 'class-transformer';
import { CityType } from '../../../types/city.type.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';

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
  public city!: CityType;

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
