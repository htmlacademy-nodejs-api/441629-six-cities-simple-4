import { NextFunction, Request, Response } from 'express';
import { HttpMethodEnum } from './http-method.enum';
import { MiddlewareInterface } from '../core/middleware/middleware.interface.js';

export interface RouteInterface {
  path: string;
  method: HttpMethodEnum;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareInterface[];
}
