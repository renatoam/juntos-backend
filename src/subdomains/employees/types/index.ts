import { Employee } from "../domain/Employee"

export enum Occupation {
  director = 'Director',
  manager = 'Manager',
  coordinator = 'Coordinator',
  architect = 'Architect',
  developer = 'Developer',
  people = 'People'
}

export type GetManyEmployeesResponse = {
  content: Employee[]
  page: number
  resultsPerPage: number
  totalResults: number
}
