import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CityServiceInterface } from './city-service.interface.js';
import { AppComponentEnum } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { CityEntity } from './city.entity.js';
import CreateCityDto from './dto/create-city.dto.js';
import { MAX_CITITES_COUNT } from './city.contant.js';
import { SortTypeEnum } from '../../types/sort-type.enum.js';

@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(AppComponentEnum.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponentEnum.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) { }

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  public async findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId).exec();
  }

  public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name: cityName }).exec();
  }

  public async findByCityNameOrCreate(cityName: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByCityName(cityName);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel
      .aggregate([
        {
          $lookup: {
            from: 'offers',
            let: { cityId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$$cityId', '$city'] } } },
              { $project: { _id: 1 } },
            ],
            as: 'offers',
          },
        }, {
          $addFields: {
            id: { $toString: '$_id' },
            offersCount: { $size: '$offers' },
          }
        }, {
          $unset: 'offers',
        }, {
          $limit: MAX_CITITES_COUNT,
        }, {
          $sort: {
            offersCount: SortTypeEnum.Down,
          },
        },
      ]).exec();
  }
}
