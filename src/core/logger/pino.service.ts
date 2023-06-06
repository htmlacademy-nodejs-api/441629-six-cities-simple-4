import { Logger, pino, TransportTargetOptions } from 'pino';
import { injectable } from 'inversify';
import { LoggerInterface } from './logger.interface.js';

const targets: TransportTargetOptions[] = [
  {
    level: 'info',
    target: 'pino/file',
    options: {},
  }, {
    level: 'info',
    target: 'pino/file',
    options: {
      destination: './logs/info.log',
      mkdir: true,
    },
  }, {
    level: 'debug',
    target: 'pino/file',
    options: {
      destination: './logs/debug.log',
      mkdir: true,
    },
  }, {
    level: 'warn',
    target: 'pino/file',
    options: {
      destination: './logs/warning.log',
      mkdir: true,
    },
  }, {
    level: 'error',
    target: 'pino/file',
    options: {
      destination: './logs/error.log',
      mkdir: true,
    },
  }
];

@injectable()
export default class PinoService implements LoggerInterface {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino({ transport: { targets } });
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }
}
