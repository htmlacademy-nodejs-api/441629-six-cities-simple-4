import cors from 'cors';
import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import { AppComponentEnum } from '../types/app-component.enum.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import { getFullServerPath, getMongoURI } from '../core/helpers/index.js';
import { ControllerInterface } from '../core/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../core/exception-filters/exception-filter.interface.js';
import { AuthenticateMiddleware } from '../core/middleware/authenticate.middleware.js';

@injectable()
export default class RestApplication {
  private readonly expressApplication: Express;
  constructor(
    @inject(AppComponentEnum.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponentEnum.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponentEnum.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponentEnum.CityController) private readonly cityController: ControllerInterface,
    @inject(AppComponentEnum.BaseExceptionFilter) private readonly baseErrorExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponentEnum.HttpErrorExceptionFilter) private readonly httpErrorExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponentEnum.ValidationExceptionFilter) private readonly validationErrorExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponentEnum.UserController) private readonly userController: ControllerInterface,
    @inject(AppComponentEnum.OfferController) private readonly offerController: ControllerInterface,
    @inject(AppComponentEnum.CommentController) private readonly commentController: ControllerInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(mongoUri);
    this.logger.info('Init database completed');
  }

  private async _initServer() {
    this.logger.info('Try to init server...');

    const port = this.config.get('PORT');
    this.expressApplication.listen(port);

    this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }

  private async _initRoutes() {
    this.logger.info('Controller initialization...');

    this.expressApplication.use('/city', this.cityController.router);
    this.expressApplication.use('/user', this.userController.router);
    this.expressApplication.use('/offer', this.offerController.router);
    this.expressApplication.use('/comment', this.commentController.router);

    this.logger.info('Controller initialization completed');
  }

  private async _initMiddleware() {
    this.logger.info('Global middleware initialization...');

    this.expressApplication.use(express.json());
    this.expressApplication.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY')),
    );
    this.expressApplication.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH')),
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));

    this.expressApplication.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApplication.use(cors());

    this.logger.info('Global middleware initialization completed');
  }

  private async _initExceptionFilters() {
    this.logger.info('Exception filters initialization');

    this.expressApplication.use(this.validationErrorExceptionFilter.catch.bind(this.validationErrorExceptionFilter));
    this.expressApplication.use(this.httpErrorExceptionFilter.catch.bind(this.httpErrorExceptionFilter));
    this.expressApplication.use(this.baseErrorExceptionFilter.catch.bind(this.baseErrorExceptionFilter));

    this.logger.info('Exception filters initialization completed');
  }

  public async init() {
    this.logger.info('Application initialization...');

    await this._initDb();
    await this._initMiddleware();
    await this._initRoutes();
    await this._initExceptionFilters();
    await this._initServer();
  }
}
