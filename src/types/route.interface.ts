import { NextFunction, Request, Response } from 'express';
import { HttpMethodEnum } from './http-method.enum';

export interface RouteInterface {
  path: string;
  method: HttpMethodEnum;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
