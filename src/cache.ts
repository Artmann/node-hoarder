export interface Cache {
  get<T>(key: string): T | null;
  set(key: string, value: any): void;
}
