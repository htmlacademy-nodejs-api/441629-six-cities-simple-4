import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { CityEntity } from '../city/city.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { OfferTypeEnum } from '../../enums/offer-type.enum.js';
import { AdvantageEnum } from '../../enums/advantage.enum.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

export class Coords {
  @prop({ required: true, type: Number })
  public latitude!: number;

  @prop({ required: true, type: Number })
  public longitude!: number;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    ref: CityEntity,
    required: true,
  })
  public city!: Ref<CityEntity>;

  @prop()
  public preview!: string;

  @prop({ type: String })
  public photo!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferTypeEnum,
  })
  public type!: OfferTypeEnum;

  @prop()
  public roomCount!: number;

  @prop()
  public guestCount!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({
    required: true,
    type: () => String,
    enum: AdvantageEnum
  })
  public advantage!: AdvantageEnum[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public owner!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({ required: true, type: Coords })
  public coords!: Coords;
}

export const OfferModel = getModelForClass(OfferEntity);
