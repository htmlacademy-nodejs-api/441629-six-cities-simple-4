import { AdvantageEnum } from '../../../enums/advantage.enum.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import { CityType } from '../../../types/city.type.js';
import { UserType } from '../../../types/user.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: CityType;
  public preview!: string;
  public photo!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: OfferTypeEnum;
  public roomCount!: number;
  public guestCount!: number;
  public price!: number;
  public advantage!: AdvantageEnum[];
  public owner!: UserType;
  public commentsCount!: number;
  public coords!: Record<'latitude' | 'longitude', number>;
}
