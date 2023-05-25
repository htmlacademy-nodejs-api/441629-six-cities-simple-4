import { readFileSync } from 'node:fs';

import { FileReaderInterface } from './file-reader.interface';
import { OfferType } from '../../types/offer.type';
import { OfferTypeEnum } from '../../enums/offer-type.enum';
import { AdvantageEnum } from '../../enums/advantage.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): OfferType[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter(row => row.trim() !== '')
      .map(line => line.split('\t'))
      .map(([
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
        UserType,
        commentsCount,
        latitude,
        longitude,
      ]) => ({
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
        advantage: advantage as AdvantageEnum,
        owner: { name, email, avatar, password, type: UserType as UserTypeEnum },
        commentsCount: Number(commentsCount),
        coords: { latitude: Number(latitude), longitude: Number(longitude) },
      }));
  }
}
