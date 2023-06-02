import 'reflect-metadata';
import { Container } from 'inversify';
import RestApplication from './app/rest.js';
import { AppComponentEnum } from './types/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createCityContainer } from './modules/city/city.container.js';
import { createOfferContainer } from './modules/offer/offer.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createCityContainer(),
    createOfferContainer(),
  );

  const application = mainContainer.get<RestApplication>(AppComponentEnum.RestApplication);
  await application.init();
}

bootstrap();
