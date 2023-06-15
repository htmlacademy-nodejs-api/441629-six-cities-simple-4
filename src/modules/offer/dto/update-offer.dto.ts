import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, Length, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdvantageEnum } from '../../../enums/advantage.enum.js';
import { OfferTypeEnum } from '../../../enums/offer-type.enum.js';
import { CityType } from '../../../types/city.type.js';
import { CoordsDto } from './create-offer.dto.js';

export default class UpdateOfferDto {
  @IsOptional()
  @Length(10, 100, { message: 'Title length must be between 10 and 100' })
  public title?: string;

  @IsOptional()
  @Length(20, 1024, { message: 'Description length must be between 20 and 1024' })
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
  @ArrayMinSize(6, { message: 'Photos count must be 6' })
  @ArrayMaxSize(6, { message: 'Photos count must be 6' })
  public photo?: string[];

  @IsOptional()
  @IsBoolean({ message: 'Field must be boolean' })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: 'Type must be an offer type' })
  public type?: OfferTypeEnum;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(1, { message: 'Minimum count of rooms is 1' })
  @Max(8, { message: 'Maximum count of rooms is 8' })
  public roomCount?: number;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(1, { message: 'Minimum count of rooms is 1' })
  @Max(10, { message: 'Maximum count of rooms is 10' })
  public guestCount?: number;

  @IsOptional()
  @IsInt({ message: 'Field must be an integer' })
  @Min(100, { message: 'Minimum count of rooms is 100' })
  @Max(100000, { message: 'Maximum count of rooms is 100 000' })
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
