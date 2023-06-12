import * as crypro from 'node:crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createSHA256(line: string, salt: string): string {
  const shaHasher = crypro.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
