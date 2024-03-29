export interface Repository<T> {
  exists(t: string): Promise<boolean>
  save(t: T): Promise<void>
  remove(t: string): Promise<boolean>
}
