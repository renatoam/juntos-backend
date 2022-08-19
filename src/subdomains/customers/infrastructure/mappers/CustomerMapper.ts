import { Customer } from "../../domain/Customer";
import { CustomerDTO } from "../dtos/CustomerDTO";
import { CustomerToPersistence } from "./CustomerMapperType";

export class CustomerMapper {
  public static toDTO(customer: Customer): CustomerDTO {
    return {
      id: customer.id.toString(),
      name: {
        title: customer.name.title,
        firstname: customer.name.first,
        lastname: customer.name.last,
      },
      email: customer.email,
      gender: customer.gender,
      birthdate: customer.dob.date,
      registered: customer.registered.date,
      phone: {
        main: customer.phone,
        cell: customer.cell
      },
      picture: {
        thumbnail: customer.picture.thumbnail,
        medium: customer.picture.medium,
        large: customer.picture.large
      },
      role: customer.role || 'VIEWER',
      location: customer.location
    }
  }

  public static toPersistence(customer: Customer): CustomerToPersistence {
    return {
      customer_id: customer.id,
      created_on: new Date().toISOString(),
      title: customer.name.title,
      first_name: customer.name.first,
      last_name: customer.name.last,
      email: customer.email,
      gender: customer.gender,
      birth_date: customer.dob.date,
      registered: customer.registered.date,
      phone: customer.phone,
      cell: customer.cell,
      thumbnail: customer.picture.thumbnail,
      medium: customer.picture.medium,
      large: customer.picture.large,
      role_id: customer.role_id,
    }
  }

  public static toDomain(persistenceCustomer: Record<string, never>): Customer {
    return Customer.create({
      name: {
        title: persistenceCustomer.title,
        first: persistenceCustomer.first_name,
        last: persistenceCustomer.last_name,
      },
      type: 'customers',
      cell: persistenceCustomer.cell,
      dob: {
        age: 0,
        date: new Date(persistenceCustomer.birth_date)
      },
      email: persistenceCustomer.email,
      gender: persistenceCustomer.gender,
      location: {
        street: persistenceCustomer.street,
        city: persistenceCustomer.city,
        state: persistenceCustomer.state,
        postcode: persistenceCustomer.postcode,
        coordinates: {
          latitude: persistenceCustomer.latitude,
          longitude: persistenceCustomer.longitude,
        },
        timezone: {
          description: persistenceCustomer.description,
          offset: persistenceCustomer.off
        }
      },
      phone: persistenceCustomer.phone,
      picture: {
        large: persistenceCustomer.large,
        medium: persistenceCustomer.medium,
        thumbnail: persistenceCustomer.thumbnail
      },
      registered: {
        age: 0,
        date: new Date(persistenceCustomer.registered)
      },
      role_id: persistenceCustomer.role_id,
      role: persistenceCustomer.role
    })
  }
}