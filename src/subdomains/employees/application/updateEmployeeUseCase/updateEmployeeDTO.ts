export type UpdateEmployeeDTO = {
  id: string | number
  name: string
  email: string
  occupation?: string
  birthday?: Date
  hire?: Date
}
