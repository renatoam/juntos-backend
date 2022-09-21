export interface LocationCustomerProps {
  customer_id: string
  location_id: string
}

export interface LocationCustomerRepository<T = LocationCustomerProps> {
  exists(t: T): Promise<boolean>
  save(t: T): Promise<void>
  remove(t: string): Promise<boolean>
}
