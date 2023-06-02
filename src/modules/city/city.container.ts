import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CityServiceInterface } from './city-service.interface';
import { AppComponentEnum } from '../../types/app-component.enum';
import CityService from './city.service';
import { CityEntity, CityModel } from './city.entity';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer.bind<CityServiceInterface>(AppComponentEnum.CityServiceInterface).to(CityService);
  cityContainer.bind<types.ModelType<CityEntity>>(AppComponentEnum.CityModel).toConstantValue(CityModel);

  return cityContainer;
}
