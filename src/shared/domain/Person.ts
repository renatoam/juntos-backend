import { LocationType, PersonProps } from "../types"
import { Entity } from "./Entity"

export interface CustomersType extends Omit<PersonProps, 'occupation'> {
  id: string
}

export interface EmployeesType extends Omit<PersonProps, 'location'> {
  id: string
}

export type CustomerLocation = {
  customerId: string
  locationId: string
}

export interface UtilityPerson {
  customers: CustomersType[]
  employees: EmployeesType[]
  locations: LocationType[]
  customerLocation: CustomerLocation[]
}

export class Person extends Entity<UtilityPerson> {
  private constructor(props?: UtilityPerson) {
    super({
      customers: props?.customers || [],
      employees: props?.employees || [],
      locations: props?.locations || [],
      customerLocation: props?.customerLocation || []
    })
  }

  public get customers(): CustomersType[] {
    return this.props.customers
  }

  public get employees(): EmployeesType[] {
    return this.props.employees
  }

  public get locations(): LocationType[] {
    return this.props.locations
  }

  public get customerLocation(): CustomerLocation[] {
    return this.props.customerLocation
  }
  
  public addCustomer(customer: CustomersType): void {
    this.props.customers.push(customer)
  }

  public addEmployee(employee: EmployeesType): void {
    this.props.employees.push(employee)
  }

  public addLocation(location: LocationType): void {
    this.props.locations.push(location)
  }

  public addCustomerLocationRelation(relation: CustomerLocation): void {
    this.props.customerLocation.push(relation)
  }

  static create(props?: UtilityPerson) {
    return new Person(props)
  }
}
