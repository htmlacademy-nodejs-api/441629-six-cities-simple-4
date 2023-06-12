import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { HttpMethodEnum } from '../../types/http-method.enum.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/common.js';
import UserRdo from './rdo/user.rdo.js';
import LoginUserDto from './dto/login-user.dto.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponentEnum.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponentEnum.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routers for UserController...');

    this.addRoute({ path: '/register', method: HttpMethodEnum.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethodEnum.Post, handler: this.login });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController',
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(
      res,
      fillDTO(UserRdo, result),
    );
  }

  public async login(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}