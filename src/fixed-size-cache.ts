import { Cache } from './cache';

export class FixedSizeCache implements Cache {
  private data: { [ index: string ]: Entry } = {};
  private firstEntry?: Entry;
  private lastEntry?: Entry;

  constructor(private size: number) {
    if (size < 1) {
      throw new Error(`You can't create a Fixed Sized Cache without a size.`);
    }
  }

  get<T>(key: string): T | null {
    if (this.data[key]) {
      const entry = this.data[key];

      this.remove(entry);
      this.add(entry);

      return entry.value;
    }


    return null;
  };

  set(key: string, value: any): void {
    if (this.data[key]) {
      const entry = this.data[key];

      entry.value = value;

      this.remove(entry);
      this.add(entry);

      return;
    }

    if (Object.keys(this.data).length >= this.size) {
      this.evictLastEntry();
    }

    const entry = { key, value };

    this.add(entry);
  };

  private add(entry: Entry): void {
    entry.right = this.firstEntry;
    entry.left = undefined;

    if (this.firstEntry) {
      this.firstEntry.left = entry;
    }

    this.firstEntry = entry;

    if (!this.lastEntry) {
      this.lastEntry = this.firstEntry;
    }

    this.data[entry.key] = entry;
  }

  private evictLastEntry(): void {
    if (!this.lastEntry) {
      return;
    }

    const evictionKey = this.lastEntry.key;

    this.remove(this.lastEntry);

    delete this.data[evictionKey];
  }

  private remove(entry: Entry): void {
    if (entry.left) {
      entry.left.right = entry.right;
    } else {
      this.firstEntry = entry.right;
    }

    if (entry.right) {
      entry.right.left = entry.left;
    } else {
      this.lastEntry = entry.left;
    }
  }
}

interface Entry {
  value: any;
  key: string;
  left?: Entry;
  right?: Entry;
}
