import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { HttpMethodEnum } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/common.js';
import OfferRdo from './rdo/offer.rdo.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponentEnum.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferControlle...');

    this.addRoute({ path: '/', method: HttpMethodEnum.Get, handler: this.index });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findNew();
    const offersToResponse = fillDTO(OfferRdo, offers);
    this.ok(res, offersToResponse);
  }
}
