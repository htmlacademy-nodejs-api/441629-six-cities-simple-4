import { AdvantageEnum } from '../../enums/advantage.enum.js';
import { CityCoords } from '../../enums/city-coords.js';
import { CityEnum } from '../../enums/city.enum.js';
import { OfferTypeEnum } from '../../enums/offer-type.enum.js';
import { UserTypeEnum } from '../../enums/user-type.enum.js';
import { OfferType } from '../../types/offer.type.js';

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
    userType: userType as UserTypeEnum
  };

  return {
    title,
    description,
    postDate: new Date(date),
    city: {
      name: city as CityEnum,
      latitude: CityCoords[city as CityEnum].latitude,
      longitude: CityCoords[city as CityEnum].longitude,
    },
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
