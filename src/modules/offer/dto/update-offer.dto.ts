import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, Length, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdvantageEnum } from '../../../enums/advantage.enum.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import { CityType } from '../../../types/city.type.js';
import { CoordsDto } from './create-offer.dto.js';
import { OfferConst, OfferDefault } from '../offer.constant.js';

export default class UpdateOfferDto {
  @IsOptional()
  @Length(OfferConst.MIN_TITLE_LENGTH, OfferConst.MAX_TITLE_LENGTH, {message: `Title length must be between ${OfferConst.MIN_TITLE_LENGTH} and ${OfferConst.MAX_TITLE_LENGTH}`})
  public title?: string;

  @IsOptional()
  @Length(OfferConst.MIN_DESCRIPTION_LENGTH, OfferConst.MAX_DESCRIPTION_LENGTH, {message: `Description length must be between ${OfferConst.MIN_DESCRIPTION_LENGTH} and ${OfferConst.MAX_DESCRIPTION_LENGTH}`})
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
  @ArrayMinSize(OfferDefault.PHOTOS_COUNT, { message: `Photos count must be ${OfferDefault.PHOTOS_COUNT}` })
  @ArrayMaxSize(OfferDefault.PHOTOS_COUNT, { message: `Photos count must be ${OfferDefault.PHOTOS_COUNT}` })
  public photo?: string[];

  @IsOptional()
  @IsBoolean({ message: 'Field must be boolean' })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: 'Type must be an offer type' })
  public type?: OfferTypeEnum;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(OfferConst.MIN_ROOM_COUNT, { message: `Minimum count of rooms is ${OfferConst.MIN_ROOM_COUNT}` })
  @Max(OfferConst.MAX_ROOM_COUNT, { message: `Maximum count of rooms is ${OfferConst.MAX_ROOM_COUNT}` })
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(OfferConst.MIN_GUEST_COUNT, { message: `Minimum count of rooms is ${OfferConst.MIN_GUEST_COUNT}` })
  @Max(OfferConst.MAX_GUEST_COUNT, { message: `Maximum count of rooms is ${OfferConst.MAX_GUEST_COUNT}` })
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(OfferConst.MIN_PRICE, { message: `Minimum count of rooms is ${OfferConst.MIN_PRICE}` })
  @Max(OfferConst.MAX_PRICE, { message: `Maximum count of rooms is ${OfferConst.MAX_PRICE}` })
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
