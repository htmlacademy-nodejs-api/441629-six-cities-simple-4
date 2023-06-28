import { CityServiceInterface } from '../../modules/city/city-service.interface.js';
import { CityModel } from '../../modules/city/city.entity.js';
import CityService from '../../modules/city/city.service.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';
import { OfferModel } from '../../modules/offer/offer.entity.js';
import OfferService from '../../modules/offer/offer.service.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { UserModel } from '../../modules/user/user.entity.js';
import UserService from '../../modules/user/user.service.js';
import { OfferType } from '../../types/offer.type.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage, getMongoURI } from '../helpers/index.js';
import ConsoleLoggerService from '../logger/console.service.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { CliCommandInterface } from './cli-command.interface.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private cityService!: CityServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: OfferType) {
    const city = await this.cityService.findByCityNameOrCreate(offer.city.name, offer.city);
    const user = await this.userService.findOrCreate({
      ...offer.owner,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      owner: user.id,
      city
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
