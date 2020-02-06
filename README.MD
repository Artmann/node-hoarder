# Node Hoarder

Your Slick Cache Library.

## Quick Start

```sh
yarn add node-hoarder
```

```ts
import { FixedSizedCache } from 'node-hoarder';

const cache = new FixedSizedCache(100);

cache.set('message', 'Hello World');

const message = cache.get<string>('message');

console.log('message'); // => Hello World
```

### Fixed Size Cache

The `FixedSizedCache` is a Least Recently Used Cache(LRU). The cache can store a
fixed number of items in memory. When it's capacity is reached, the item that
hasn't been used for the longest amount of time will be evicted.

The `FixedSizedCache` is great when you want to be able to control the memory
consumption of your application.

```
class FixedSizeCache {
  constructor(size: number);
  get<T>(key: string): T;
  set(key: string, value: any): void;
}
```
