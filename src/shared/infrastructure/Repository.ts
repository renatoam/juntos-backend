export interface Repository<T> {
  exists(t: string): Promise<boolean>
  save(t: T): Promise<void>
  remove(t: string): Promise<void>
  update(id: string, t: T): Promise<void>
}
