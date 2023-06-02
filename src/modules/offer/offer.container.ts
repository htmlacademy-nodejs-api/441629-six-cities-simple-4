import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer-service.interface.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import OfferService from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferServiceInterface>(AppComponentEnum.OfferServiceInterface).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(AppComponentEnum.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
