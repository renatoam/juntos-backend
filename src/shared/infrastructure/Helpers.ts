import axios from "axios";
import { UniqueEntityID } from "../domain/UniqueEntityID";
import { RequestMethods, SearchKey } from "../types";
import { nodeCache } from "./database/redis";

export class Helper<T extends { id?: UniqueEntityID }> {
  findFromAList(array: T[], searchItem: string | number, searchKey: SearchKey): T | undefined {
    return array.find(item => item[searchKey].toString() === searchItem)
  }

  async getDataFromRemote(url: string): Promise<T[]> {
    const response = await axios.get(url)
    const data = response.data as Array<typeof response.data>

    return data ?? []
  }

  getDataFromCache(key: string): T[] {
    return nodeCache.get(key) ?? []
  }

  isCached(key: string): boolean {
    return !!nodeCache.has(key)
  }

  saveMassiveToCache<K>(data: K[], key: string) {
    nodeCache.set(key, data)
  }

  saveNewRegisterToCache<K extends { id: UniqueEntityID }>(register: K, key: string, isUpdate?: boolean): void {
    const cached: K[] = nodeCache.get(key) ?? []

    if (isUpdate) {
      const itemIndex = cached.findIndex(itemCached => itemCached.id === register.id)

      cached[itemIndex] = register
      nodeCache.set(key, [...cached])

      return
    }

    nodeCache.set(key, [...cached, register])
  }

  async saveToRemoteBulk<K>(url: string, items: K[]) {
    const requests = items.map(async body => axios.post(url, body))

    await Promise.all(requests)
  }

  async saveNewRegisterToRemote<K>(url: string, body: K, requestMethod?: RequestMethods) {
    const method = requestMethod ?? RequestMethods.POST
    let endpoint: string = url

    if (requestMethod === RequestMethods.PUT || requestMethod === RequestMethods.PATCH) {
      const { id } = body as unknown as K & { id: string | number }

      endpoint = `${endpoint}/${id}`
    }

    await axios[method](endpoint, body)
  }

  removeItemFromCache(
    cacheKey: string,
    id: UniqueEntityID
  ) {
    const remainingData =
      this.getDataFromCache(cacheKey).filter((item: T) => item.id !== id)

    this.saveMassiveToCache(remainingData, cacheKey)
  }

  async removeItemFromRemote(url: string, id: UniqueEntityID): Promise<void> {
    await axios.delete(`${url}/${id}`)
  }
}
