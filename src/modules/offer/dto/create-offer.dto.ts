import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, Length, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdvantageEnum } from '../../../enums/advantage.enum.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import { CityType } from '../../../types/city.type.js';

export class CoordsDto {
  @IsNumber({}, { message: 'Field must be number' })
  public latitude!: number;

  @IsNumber({}, { message: 'Field must be number' })
  public longitude!: number;
}

export default class CreateOfferDto {
  @Length(10, 100, {message: 'Title length must be between 10 and 100'})
  public title!: string;

  @Length(20, 1024, {message: 'Description length must be between 20 and 1024'})
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
  @Min(1, { message: 'Minimum count of rooms is 1' })
  @Max(8, { message: 'Maximum count of rooms is 8' })
  public roomCount!: number;

  @IsInt({ message: 'Field must be an integer' })
  @Min(1, { message: 'Minimum count of rooms is 1' })
  @Max(10, { message: 'Maximum count of rooms is 10' })
  public guestCount!: number;

  @IsInt({ message: 'Field must be an integer' })
  @Min(100, { message: 'Minimum count of rooms is 100' })
  @Max(100000, { message: 'Maximum count of rooms is 100 000' })
  public price!: number;

  @IsArray({ message: 'Field advantage must be an integer' })
  @IsEnum(AdvantageEnum, { each: true, message: 'Type must be an advantage type' })
  public advantage!: AdvantageEnum[];

  public owner!: string;

  @ValidateNested({ each: true })
  @Type(() => CoordsDto)
  public coords!: CoordsDto;
}
