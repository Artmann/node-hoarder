import { FixedSizeCache } from './fixed-size-cache';

describe('FixedSizeCache', () => {
  it('can set and get values', () => {
    const cache = new FixedSizeCache(100);

    cache.set('message', 'Hello World');
    cache.set('123', {
      firstName: 'John',
      lastName: 'Smith'
    });

    const message = cache.get<string>('message');
    const document = cache.get<object>('123');

    expect(message).toEqual('Hello World');
    expect(document).toEqual({
      firstName: 'John',
      lastName: 'Smith'
    });
  });

  it(`evicts values when it's full`, () => {
    const cache = new FixedSizeCache(3);

    cache.set('1', 'Rose');
    cache.set('2', 'Donna');
    cache.set('3', 'Martha');
    cache.set('4', 'Amy');

    expect(cache.get<string>('1')).toEqual(null);
    expect(cache.get<string>('2')).toEqual('Donna');
    expect(cache.get<string>('3')).toEqual('Martha');
    expect(cache.get<string>('4')).toEqual('Amy');
  });

  it(`evicts values that hasn't been accessed recently`, () => {
    const cache = new FixedSizeCache(3);

    cache.set('1', 'Rose');
    cache.set('2', 'Donna');
    cache.set('3', 'Martha');

    cache.get<string>('1');
    cache.get<string>('2');
    cache.get<string>('1');
    cache.get<string>('2');
    cache.get<string>('3');
    cache.get<string>('1');

    cache.set('4', 'Amy');

    expect(cache.get<string>('1')).toEqual('Rose');
    expect(cache.get<string>('2')).toEqual(null);
    expect(cache.get<string>('3')).toEqual('Martha');
    expect(cache.get<string>('4')).toEqual('Amy');
  });

  it('works with bigger cache sizes', () => {
    const cache = new FixedSizeCache(5000);

    for (let i = 0; i < 10000; i++) {
      cache.set(i.toString(), `Item ${i}`);

      expect(cache.get(i.toString())).toEqual(`Item ${i}`);
    }
  });

  it('overwrites existing values', () => {
    const cache = new FixedSizeCache(10);

    cache.set('a', 'foo');
    cache.set('b', 'bar');
    cache.set('a', 'baz');

    expect(cache.get('a')).toEqual('baz');
    expect(cache.get('b')).toEqual('bar');
  });

  it('throws and error on invalid size', () => {
    expect(() => {
      new FixedSizeCache(0);
    }).toThrow(`You can't create a Fixed Sized Cache without a size.`);
    expect(() => {
      new FixedSizeCache(-1);
    }).toThrow(`You can't create a Fixed Sized Cache without a size.`);
  });
});
