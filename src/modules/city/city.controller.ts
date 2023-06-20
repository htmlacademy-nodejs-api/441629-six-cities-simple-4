import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { HttpMethodEnum } from '../../types/http-method.enum.js';
import { CityServiceInterface } from './city-service.interface.js';
import { fillDTO } from '../../core/helpers/common.js';
import CityRdo from './rdo/city.rdo.js';
import CreateCityDto from './dto/create-city.dto.js';
import HttpError from '../../core/errors/http-error.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middleware/private-route.middleware.js';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponentEnum.CityServiceInterface) private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController...');

    this.addRoute({
      path: '/',
      method: HttpMethodEnum.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethodEnum.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCityDto),
      ],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const citiesToResponse = fillDTO(CityRdo, cities);
    this.ok(res, citiesToResponse);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>,
    res: Response,
  ): Promise<void> {
    const existCity = await this.cityService.findByCityName(body.name);

    if (existCity) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» exists.`,
        'CategoryController',
      );
    }

    const result = await this.cityService.create(body);
    this.created(res, fillDTO(CityRdo, result));
  }
}
