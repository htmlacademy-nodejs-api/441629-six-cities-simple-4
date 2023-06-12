import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserServiceInterface } from './user-service.interface.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import UserService from './user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import UserController from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserServiceInterface>(AppComponentEnum.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(AppComponentEnum.UserModel).toConstantValue(UserModel);
  userContainer.bind<ControllerInterface>(AppComponentEnum.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
