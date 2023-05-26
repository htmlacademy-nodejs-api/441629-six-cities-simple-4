import { AdvantageEnum } from '../../enums/advantage.enum';
import { OfferTypeEnum } from '../../enums/offer-type.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { OfferType } from '../../types/offer.type';

export function createOffer(offerData: string): OfferType {
  const [
    title,
    description,
    date,
    city,
    preview,
    photo,
    isPremium,
    rating,
    type,
    roomCount,
    guestCount,
    price,
    advantage,
    name,
    email,
    avatar,
    password,
    userType,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const owner = {
    name,
    email,
    avatar,
    password,
    type: userType as UserTypeEnum
  };

  return {
    title,
    description,
    postDate: new Date(date),
    city,
    preview,
    photo: photo.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number(rating),
    type: type as OfferTypeEnum,
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    price: Number(price),
    advantage: (advantage.split(';')) as AdvantageEnum[],
    owner,
    commentsCount: Number(commentsCount),
    coords: { latitude: Number(latitude), longitude: Number(longitude) },
  };
}
