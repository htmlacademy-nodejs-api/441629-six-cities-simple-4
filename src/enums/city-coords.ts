import { CityEnum } from './city.enum.js';

export const CityCoords: Record<CityEnum, Record<'latitude' | 'longitude', number>> = {
  [ CityEnum.PARIS ]: {
    latitude: 48.85661,
    longitude: 2.351499,
  },
  [ CityEnum.COLOGNE ]: {
    latitude: 50.938361,
    longitude: 6.959974,
  },
  [ CityEnum.BRUSSELS ]: {
    latitude: 50.846557,
    longitude: 4.351697,
  },
  [ CityEnum.AMSTERDAM ]: {
    latitude: 52.370216,
    longitude: 4.895168,
  },
  [ CityEnum.HAMBURG ]: {
    latitude: 53.550341,
    longitude: 10.000654,
  },
  [ CityEnum.DUSSELDORF ]: {
    latitude: 51.225402,
    longitude: 6.776314,
  },
};
