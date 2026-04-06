class EntityStoreBucket<K, T> {
  keys: K[] = [];
  valuesList: T[] = [];

  indexOf(id: K): i32 {
    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i] == id) {
        return i;
      }
    }

    return -1;
  }

  get(id: K): T | null {
    const index = this.indexOf(id);
    return index >= 0 ? this.valuesList[index] : null;
  }

  has(id: K): bool {
    return this.indexOf(id) >= 0;
  }

  set(id: K, value: T): void {
    const index = this.indexOf(id);
    if (index >= 0) {
      this.valuesList[index] = value;
      return;
    }

    this.keys.push(id);
    this.valuesList.push(value);
  }

  delete(id: K): void {
    const index = this.indexOf(id);
    if (index < 0) return;

    this.keys.splice(index, 1);
    this.valuesList.splice(index, 1);
  }

  getOrCreate(id: K, create: () => T): T {
    const existing = this.get(id);
    if (existing != null) {
      return existing;
    }

    const value = create();
    this.set(id, value);
    return value;
  }

  values(): T[] {
    const out = new Array<T>(this.valuesList.length);
    for (let i = 0; i < this.valuesList.length; i++) {
      out[i] = this.valuesList[i];
    }

    return out;
  }
}

export class EntityStore<K, T> {
  bucket: EntityStoreBucket<K, T>;

  constructor(bucket: EntityStoreBucket<K, T>) {
    this.bucket = bucket;
  }

  get(id: K): T | null {
    return this.bucket.get(id);
  }

  has(id: K): bool {
    return this.bucket.has(id);
  }

  set(id: K, value: T): void {
    this.bucket.set(id, value);
  }

  delete(id: K): void {
    this.bucket.delete(id);
  }

  getOrCreate(id: K, create: () => T): T {
    return this.bucket.getOrCreate(id, create);
  }

  values(): T[] {
    return this.bucket.values();
  }
}

export class StoreApi {
  stores: Map<string, usize> = new Map<string, usize>();

  entity<K, T>(name: string): EntityStore<K, T> {
    const existing = this.stores.has(name) ? this.stores.get(name) : 0;
    if (existing != 0) {
      return changetype<EntityStore<K, T>>(existing);
    }

    const bucket = new EntityStoreBucket<K, T>();
    const store = new EntityStore<K, T>(bucket);
    this.stores.set(name, changetype<usize>(store));
    return store;
  }
}
