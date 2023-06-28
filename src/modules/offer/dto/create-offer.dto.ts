import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, Length, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdvantageEnum } from '../../../enums/advantage.enum.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import { CityType } from '../../../types/city.type.js';
import { OfferConst } from '../offer.constant.js';

export class CoordsDto {
  @IsNumber({}, { message: 'Field must be number' })
  public latitude!: number;

  @IsNumber({}, { message: 'Field must be number' })
  public longitude!: number;
}

export default class CreateOfferDto {
  @Length(OfferConst.MIN_TITLE_LENGTH, OfferConst.MAX_TITLE_LENGTH, { message: `Title length must be between ${OfferConst.MIN_TITLE_LENGTH} and ${OfferConst.MAX_TITLE_LENGTH}` })
  public title!: string;

  @Length(OfferConst.MIN_DESCRIPTION_LENGTH, OfferConst.MAX_DESCRIPTION_LENGTH, { message: `Description length must be between ${OfferConst.MIN_DESCRIPTION_LENGTH} and ${OfferConst.MAX_DESCRIPTION_LENGTH}` })
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
  @Min(OfferConst.MIN_ROOM_COUNT, { message: `Minimum count of rooms is ${OfferConst.MIN_ROOM_COUNT}` })
  @Max(OfferConst.MAX_ROOM_COUNT, { message: `Maximum count of rooms is ${OfferConst.MAX_ROOM_COUNT}` })
  public roomCount!: number;

  @IsInt({ message: 'Field must be an integer' })
  @Min(OfferConst.MIN_GUEST_COUNT, { message: `Minimum count of rooms is ${OfferConst.MIN_GUEST_COUNT}` })
  @Max(OfferConst.MAX_GUEST_COUNT, { message: `Maximum count of rooms is ${OfferConst.MAX_GUEST_COUNT}` })
  public guestCount!: number;

  @IsInt({ message: 'Field must be an integer' })
  @Min(OfferConst.MIN_PRICE, { message: `Minimum count of rooms is ${OfferConst.MIN_PRICE}` })
  @Max(OfferConst.MAX_PRICE, { message: `Maximum count of rooms is ${OfferConst.MAX_PRICE}` })
  public price!: number;

  @IsArray({ message: 'Field advantage must be an integer' })
  @IsEnum(AdvantageEnum, { each: true, message: 'Type must be an advantage type' })
  public advantage!: AdvantageEnum[];

  public owner!: string;

  @ValidateNested({ each: true })
  @Type(() => CoordsDto)
  public coords!: CoordsDto;
}
