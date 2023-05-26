import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { MockDataType } from '../../types/mock-data.type';
import { OfferGeneratorInterface } from './offer-generator.interface';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 10;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockDataType) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.previews);
    const photo = getRandomItems<string>(this.mockData.photoes).join(';');
    const isPremium = getRandomItem<boolean>([true, false]);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const type = getRandomItem<string>(this.mockData.offerTypes);
    const roomCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT);
    const guestCount = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const advantage = getRandomItems<string>(this.mockData.advantages).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<string>(this.mockData.types);
    const commentsCount = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
    const latitude = getRandomItem<number>(this.mockData.latitude);
    const longitude = getRandomItem<number>(this.mockData.longitude);

    return [
      title, description, date, city, preview,
      photo, isPremium, rating, type, roomCount,
      guestCount, price, advantage, name, email,
      avatar, password, userType, commentsCount,
      latitude, longitude,
    ].join('\t');
  }
}
