import { Customer } from "../../domain/Customer";
import { CustomerDTO } from "../dtos/CustomerDTO";
import { CustomerToPersistence } from "./CustomerMapperType";

export class CustomerMapper {
  public static toDTO(customer: Customer): CustomerDTO {
    return {
      id: customer.id.toString(),
      name: {
        title: customer.name.title,
        firstName: customer.name.firstName,
        lastName: customer.name.lastName,
      },
      email: customer.email,
      gender: customer.gender,
      birthdate: customer.birthdate,
      registered: customer.registered,
      phone: {
        main: customer.phone.main,
        cell: customer.phone.cell
      },
      picture: {
        thumbnail: customer.picture.thumbnail,
        medium: customer.picture.medium,
        large: customer.picture.large
      },
      role: customer.role,
      location: customer.location
    }
  }

  public static toPersistence(customer: Customer): CustomerToPersistence {
    return {
      customer_id: customer.id,
      created_on: new Date().toISOString(),
      title: customer.name.title,
      first_name: customer.name.firstName,
      last_name: customer.name.lastName,
      email: customer.email,
      gender: customer.gender,
      birth_date: customer.birthdate,
      registered: customer.registered,
      phone: customer.phone.main,
      cell: customer.phone.cell,
      thumbnail: customer.picture.thumbnail,
      medium: customer.picture.medium,
      large: customer.picture.large,
      role_id: customer.role.id,
    }
  }

  public static toDomain(rawCustomer: Record<string, never>): Customer {
    return Customer.create({
      name: {
        title: rawCustomer.title,
        firstName: rawCustomer.first_name,
        lastName: rawCustomer.last_name,
      },
      type: 'customers',
      birthdate: new Date(rawCustomer.birth_date),
      email: rawCustomer.email,
      gender: rawCustomer.gender,
      location: {
        street: rawCustomer.street,
        city: rawCustomer.city,
        state: rawCustomer.state,
        postcode: rawCustomer.postcode,
        coordinates: {
          latitude: rawCustomer.latitude,
          longitude: rawCustomer.longitude,
        },
        timezone: {
          description: rawCustomer.description,
          offset: rawCustomer.off
        }
      },
      phone: {
        main: rawCustomer.phone,
        cell: rawCustomer.cell
      },
      picture: {
        large: rawCustomer.large,
        medium: rawCustomer.medium,
        thumbnail: rawCustomer.thumbnail
      },
      registered: new Date(rawCustomer.registered),
      role: rawCustomer.role
    }, rawCustomer.customer_id)
  }
}