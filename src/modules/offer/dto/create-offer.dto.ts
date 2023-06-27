import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, Length, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdvantageEnum } from '../../../enums/advantage.enum.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import { CityType } from '../../../types/city.type.js';
import {
  MIN_OFFER_TITLE_LENGTH,
  MAX_OFFER_TITLE_LENGTH,
  MIN_OFFER_DESCRIPTION_LENGTH,
  MAX_OFFER_DESCRIPTION_LENGTH,
  MIN_OFFER_ROOM_COUNT,
  MAX_OFFER_ROOM_COUNT,
  MIN_OFFER_GUEST_COUNT,
  MAX_OFFER_GUEST_COUNT,
  MIN_OFFER_PRICE,
  MAX_OFFER_PRICE,
} from '../offer.constant.js';

export class CoordsDto {
  @IsNumber({}, { message: 'Field must be number' })
  public latitude!: number;

  @IsNumber({}, { message: 'Field must be number' })
  public longitude!: number;
}

export default class CreateOfferDto {
  @Length(MIN_OFFER_TITLE_LENGTH, MAX_OFFER_TITLE_LENGTH, { message: `Title length must be between ${MIN_OFFER_TITLE_LENGTH} and ${MAX_OFFER_TITLE_LENGTH}` })
  public title!: string;

  @Length(MIN_OFFER_DESCRIPTION_LENGTH, MAX_OFFER_DESCRIPTION_LENGTH, { message: `Description length must be between ${MIN_OFFER_DESCRIPTION_LENGTH} and ${MAX_OFFER_DESCRIPTION_LENGTH}` })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate!: Date;

  @IsMongoId({ message: 'City id must be valid id' })
  public city!: CityType;

  @IsBoolean({ message: 'Field must be boolean' })
  public isPremium!: boolean;

  @IsEnum(OfferTypeEnum, { message: 'Type must be an offer type' })
  public type!: OfferTypeEnum;

  @IsInt({ message: 'Field must be an integer' })
  @Min(MIN_OFFER_ROOM_COUNT, { message: `Minimum count of rooms is ${MIN_OFFER_ROOM_COUNT}` })
  @Max(MAX_OFFER_ROOM_COUNT, { message: `Maximum count of rooms is ${MAX_OFFER_ROOM_COUNT}` })
  public roomCount!: number;

  @IsInt({ message: 'Field must be an integer' })
  @Min(MIN_OFFER_GUEST_COUNT, { message: `Minimum count of rooms is ${MIN_OFFER_GUEST_COUNT}` })
  @Max(MAX_OFFER_GUEST_COUNT, { message: `Maximum count of rooms is ${MAX_OFFER_GUEST_COUNT}` })
  public guestCount!: number;

  @IsInt({ message: 'Field must be an integer' })
  @Min(MIN_OFFER_PRICE, { message: `Minimum count of rooms is ${MIN_OFFER_PRICE}` })
  @Max(MAX_OFFER_PRICE, { message: `Maximum count of rooms is ${MAX_OFFER_PRICE}` })
  public price!: number;

  @IsArray({ message: 'Field advantage must be an integer' })
  @IsEnum(AdvantageEnum, { each: true, message: 'Type must be an advantage type' })
  public advantage!: AdvantageEnum[];

  public owner!: string;

  @ValidateNested({ each: true })
  @Type(() => CoordsDto)
  public coords!: CoordsDto;
}
