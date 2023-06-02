import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { CityType } from '../../types/city.type.js';
import { CityEnum } from '../../enums/city.enum.js';

const { prop, modelOptions } = typegoose;

export interface CityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'cities',
  }
})
export class CityEntity extends defaultClasses.TimeStamps implements CityType {
  @prop({ required: true, enum: CityEnum })
  public name!: CityEnum;

  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}

export const CityModel = getModelForClass(CityEntity);
