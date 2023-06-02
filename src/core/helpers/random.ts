export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomCoordinates(value: number): number {
  const leftPart = value > 0 ? Math.floor(value) : Math.ceil(value);
  const part = (Math.abs(value) - Math.abs(leftPart)) * 1e6;

  return leftPart + generateRandomValue(0, part) / 1e6;
}
