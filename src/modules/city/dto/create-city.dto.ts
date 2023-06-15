import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CityEnum } from '../../../enums/city.enum.js';

export default class CreateCityDto {
  @IsString({ message: 'Name is required' })
  @IsEnum(CityEnum, { message: 'City name must be CityEnum' })
  public name!: CityEnum;

  @IsNumber({}, { message: 'Latitude must be a number' })
  public latitude!: number;

  @IsNumber({}, { message: 'Longitude must be a number' })
  public longitude!: number;
}
