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
import { createJWT, fillDTO } from '../../core/helpers/common.js';
import LoginUserDto from './dto/login-user.dto.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middleware/document-exists.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-objectid.middleware.js';
import { UploadFileMiddleware } from '../../core/middleware/upload-file.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { JWT_ALGORITHM } from './user.constant.js';
import LoggedUserRdo from './rdo/logged-user.rdo.js';
import RegisterUserRdo from './rdo/register-user.rdo.js';
import UploadUserAvatarResponse from './rdo/upload-user-avatar.response.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponentEnum.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponentEnum.ConfigInterface) protected readonly configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routers for UserController...');

    this.addRoute({
      path: '/register',
      method: HttpMethodEnum.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethodEnum.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethodEnum.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethodEnum.Get,
      handler: this.checkAuthenticate,
    });
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

    const user = await this.userService.create(body, this.configService.get('SALT'));

    const token = await createJWT(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      {
        email: user.email,
        id: user.id,
      }
    );

    this.created(
      res,
      { ...fillDTO(RegisterUserRdo, user), token },
    );
  }

  public async login(
    { body }: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController',
      );
    }

    const token = await createJWT(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      {
        email: user.email,
        id: user.id,
      }
    );

    this.ok(res, {
      ...fillDTO(LoggedUserRdo, user),
      token,
    });
  }

  public async uploadAvatar(req: Request, res: Response) {
    const { userId } = req.params;
    const uploadFile = { avatar: req.file?.filename };
    await this.userService.updateById(userId, uploadFile);

    this.created(res, fillDTO(UploadUserAvatarResponse, uploadFile));
  }

  public async checkAuthenticate(req: Request, res: Response) {
    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController',
      );
    }

    const { user: { email } } = req;
    const foundedUser = await this.userService.findByEmail(email);

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }
}
