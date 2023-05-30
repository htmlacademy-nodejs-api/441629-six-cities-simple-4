import 'reflect-metadata';
import { Container } from 'inversify';
import RestApplication from './app/rest.js';
import ConfigService from './core/config/config.service.js';
import PinoService from './core/logger/pino.service.js';
import { ConfigInterface } from './core/config/config.interface.js';
import { RestSchema } from './core/config/rest.schema.js';
import { LoggerInterface } from './core/logger/logger.interface.js';
import { AppComponentEnum } from './types/app-component.enum.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RestApplication>(AppComponentEnum.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(AppComponentEnum.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponentEnum.ConfigInterface).to(ConfigService).inSingletonScope();

  const application = container.get<RestApplication>(AppComponentEnum.RestApplication);
  await application.init();
}

bootstrap();
