import * as crypro from 'node:crypto';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createSHA256(line: string, salt: string): string {
  const shaHasher = crypro.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}
