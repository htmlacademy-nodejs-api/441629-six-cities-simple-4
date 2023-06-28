import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { HttpMethodEnum } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/common.js';
import OfferRdo from './rdo/offer.rdo.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { RequestQueryType } from '../../types/request-query.type.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-objectid.middleware.js';
import { OfferDefault } from './offer.constant.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middleware/private-route.middleware.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { UploadFileMiddleware, UploadFilesArrayMiddleware } from '../../core/middleware/upload-file.middleware.js';
import UploadPreviewResponse from './rdo/upload-preview.response.js';
import UploadPhotosResponse from './rdo/upload-photos.response.js';
import { ValidateIsOwnerMiddleware } from '../../core/middleware/validate-is-owner.middleware.js';

type ParamsOfferDetails = {
  offerId: string;
} | ParamsDictionary;

type ParamsCityDetails = {
  cityId: string;
} | ParamsDictionary

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponentEnum.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(AppComponentEnum.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponentEnum.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferControlle...');

    this.addRoute({
      path: '/',
      method: HttpMethodEnum.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethodEnum.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/',
      method: HttpMethodEnum.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethodEnum.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateIsOwnerMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethodEnum.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateIsOwnerMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethodEnum.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/city/:cityId',
      method: HttpMethodEnum.Get,
      handler: this.getOffersFromCity,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/offer/new',
      method: HttpMethodEnum.Get,
      handler: this.getNew,
    });
    this.addRoute({
      path: '/offer/discussed',
      method: HttpMethodEnum.Get,
      handler: this.getDiscussed,
    });
    this.addRoute({
      path: '/:offerId/preview',
      method: HttpMethodEnum.Post,
      handler: this.uploadPreview,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateIsOwnerMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'preview'),
      ],
    });
    this.addRoute({
      path: '/:offerId/photos',
      method: HttpMethodEnum.Post,
      handler: this.uploadPhotos,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateIsOwnerMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFilesArrayMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'photo'),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findNew();
    const offersToResponse = fillDTO(OfferRdo, offers);

    this.ok(res, offersToResponse);
  }

  public async show(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, owner: user.id });
    const offer = await this.offerService.findById(result.id);

    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    { params }: Request<ParamsOfferDetails>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;

    await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, {});
  }

  public async update(
    { body, params }: Request<ParamsOfferDetails, UnknownRecord, UpdateOfferDto>,
    res: Response,
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getOffersFromCity(
    { params, query }: Request<ParamsCityDetails, UnknownRecord, UnknownRecord, RequestQueryType>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.findByCityId(params.cityId, query.limit);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getNew(_req: Request, res: Response) {
    const offers = await this.offerService.findNew(OfferDefault.NEW_COUNT);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getDiscussed(_req: Request, res: Response) {
    const offers = await this.offerService.findDiscussed(OfferDefault.DISCUSSED_COUNT);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getComments(
    { params }: Request<ParamsOfferDetails, UnknownRecord, UnknownRecord>,
    res: Response,
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);

    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async uploadPreview(req: Request<ParamsOfferDetails>, res: Response) {
    const { offerId } = req.params;
    const updateDto = { preview: req.file?.filename };
    await this.offerService.updateById(offerId, updateDto);

    this.created(res, fillDTO(UploadPreviewResponse, updateDto));
  }

  public async uploadPhotos(req: Request<ParamsOfferDetails>, res: Response) {
    const { offerId } = req.params;
    const filenames: string[] = (req.files as Express.Multer.File[])
      .map((item) => item.filename);

    const updateDto = { photo: filenames };
    await this.offerService.updateById(offerId, updateDto);

    this.created(res, fillDTO(UploadPhotosResponse, updateDto));
  }
}
