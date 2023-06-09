export const AppComponentEnum = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),

  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),

  CityServiceInterface: Symbol.for('CityServiceInterface'),
  CityModel: Symbol.for('CityModel'),
  CityController: Symbol.for('CityController'),

  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  OfferModel: Symbol.for('OfferModel'),
  OfferController: Symbol.for('OfferController'),

  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),

  BaseExceptionFilter: Symbol.for('BaseExceptionFilter'),
  HttpErrorExceptionFilter: Symbol.for('HttpErrorExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
} as const;
