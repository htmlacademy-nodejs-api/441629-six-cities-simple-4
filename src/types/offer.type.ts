import { AdvantageEnum } from '../enums/advantage.enum';
import { OfferTypeEnum } from '../enums/offer-type.enum';
import { CityType } from './city.type';
import { UserType } from './user.type';

export type OfferType = {
  title: string;
  description: string;
  postDate: Date;
  city: CityType;
  preview: string;
  photo: string[];
  isPremium: boolean;
  rating: number;
  type: OfferTypeEnum;
  roomCount: number;
  guestCount: number;
  price: number;
  advantage: AdvantageEnum[];
  owner: UserType;
  commentsCount: number;
  coords: { latitude: number, longitude: number };
};
