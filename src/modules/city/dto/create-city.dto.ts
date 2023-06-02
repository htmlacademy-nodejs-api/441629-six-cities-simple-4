import { CityEnum } from '../../../enums/city.enum.js';

export default class CreateCityDto {
  public name!: CityEnum;
  public latitude!: number;
  public longitude!: number;
}
