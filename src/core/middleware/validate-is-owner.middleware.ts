import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from './middleware.interface.js';
import HttpError from '../errors/http-error.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';

export class ValidateIsOwnerMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: OfferServiceInterface,
    private readonly entityName: string,
    private readonly paramName: string,
  ) { }

  public async execute({ params, user }: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    const offer = await this.service.findById(documentId);
    console.log(offer?.owner.id, user.id);
    if (offer?.owner.id !== user.id) {
      throw new HttpError(
        StatusCodes.FAILED_DEPENDENCY,
        `User is not owner of ${this.entityName} with ${documentId}.`,
        'DocumentExistsMiddleware',
      );
    }

    next();
  }
}
