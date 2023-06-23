import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { createErrorObject } from '../helpers/index.js';
import { ServiceErrorEnum } from '../../types/service-error.enum.js';

@injectable()
export default class BaseExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register BaseExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[BaseException]: ${error.message}`);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ServiceErrorEnum.ServiceError, error.message));
  }
}
