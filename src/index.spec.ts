import { FixedSizeCache } from './index';

function fibonacci(n: number): number {
  if (n <= 2) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const cache = new FixedSizeCache(500);

function cachedFibonacci(n: number): number {
  if (n <= 2) {
    return 1;
  }
  const cacheKey = n.toString();
  const cachedValue = cache.get<number>(cacheKey);

  if (cachedValue) {
    return cachedValue;
  }

  const value = cachedFibonacci(n - 1) + cachedFibonacci(n - 2);

  cache.set(cacheKey, value);

  return value;
};

describe('Fibonacci', () => {
  it('is faster with cache', () => {
    fibonacci(20);
    cachedFibonacci(20);

    const s1 = process.hrtime();
    const a = fibonacci(20);
    const [, t1] = process.hrtime(s1);

    const s2 = process.hrtime();
    const b = cachedFibonacci(20);
    const [, t2] = process.hrtime(s2);

    expect(a).toEqual(b);
    expect(t2).toBeLessThan(t1);
  });
})
