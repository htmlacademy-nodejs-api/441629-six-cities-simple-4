import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { HttpMethodEnum } from '../../types/http-method.enum.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/common.js';
import CommentRdo from './rdo/comment.rdo.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponentEnum.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponentEnum.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({ path: '/', method: HttpMethodEnum.Post, handler: this.create });
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateCommentDto>,
    res: Response,
  ): Promise<void> {
    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController',
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.updateRating(body.offerId, body.rating);
    await this.offerService.incCommentsCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
