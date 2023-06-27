import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, Length, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdvantageEnum } from '../../../enums/advantage.enum.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import { CityType } from '../../../types/city.type.js';
import { CoordsDto } from './create-offer.dto.js';
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
  DEFAULT_PHOTOS_COUNT,
} from '../offer.constant.js';

export default class UpdateOfferDto {
  @IsOptional()
  @Length(MIN_OFFER_TITLE_LENGTH, MAX_OFFER_TITLE_LENGTH, {message: `Title length must be between ${MIN_OFFER_TITLE_LENGTH} and ${MAX_OFFER_TITLE_LENGTH}`})
  public title?: string;

  @IsOptional()
  @Length(MIN_OFFER_DESCRIPTION_LENGTH, MAX_OFFER_DESCRIPTION_LENGTH, {message: `Description length must be between ${MIN_OFFER_DESCRIPTION_LENGTH} and ${MAX_OFFER_DESCRIPTION_LENGTH}`})
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate?: Date;

  @IsOptional()
  @IsMongoId({ message: 'City id must be valid id' })
  public city?: CityType;

  @IsOptional()
  @MaxLength(256, { message: 'Too long for field IMAGE' })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: 'Field photo must be an integer' })
  @ArrayMinSize(DEFAULT_PHOTOS_COUNT, { message: `Photos count must be ${DEFAULT_PHOTOS_COUNT}` })
  @ArrayMaxSize(DEFAULT_PHOTOS_COUNT, { message: `Photos count must be ${DEFAULT_PHOTOS_COUNT}` })
  public photo?: string[];

  @IsOptional()
  @IsBoolean({ message: 'Field must be boolean' })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: 'Type must be an offer type' })
  public type?: OfferTypeEnum;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(MIN_OFFER_ROOM_COUNT, { message: `Minimum count of rooms is ${MIN_OFFER_ROOM_COUNT}` })
  @Max(MAX_OFFER_ROOM_COUNT, { message: `Maximum count of rooms is ${MAX_OFFER_ROOM_COUNT}` })
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(MIN_OFFER_GUEST_COUNT, { message: `Minimum count of rooms is ${MIN_OFFER_GUEST_COUNT}` })
  @Max(MAX_OFFER_GUEST_COUNT, { message: `Maximum count of rooms is ${MAX_OFFER_GUEST_COUNT}` })
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(MIN_OFFER_PRICE, { message: `Minimum count of rooms is ${MIN_OFFER_PRICE}` })
  @Max(MAX_OFFER_PRICE, { message: `Maximum count of rooms is ${MAX_OFFER_PRICE}` })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Field advantage must be an integer' })
  @IsEnum(AdvantageEnum, { each: true, message: 'Type must be an advantage type' })
  public advantage?: AdvantageEnum[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CoordsDto)
  public coords?: Record<'latitude' | 'longitude', number>;
}
