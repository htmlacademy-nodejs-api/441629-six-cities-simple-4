import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import ValidationError from '../errors/validation-error.js';
import { createErrorObject } from '../helpers/common.js';
import { ServiceErrorEnum } from '../../types/service-error.enum.js';

@injectable()
export default class ValidationExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`);

    error.details.forEach(
      (errorField) => this.logger.error(`[${errorField.property}] - ${errorField.messages}`)
    );

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ServiceErrorEnum.ValidationError, error.message, error.details));
  }
}
