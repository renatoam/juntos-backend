import { LocationToPersistence } from "../../../../shared/infrastructure/mappers/LocationMapperType";
import { Customer } from "../../domain/Customer";
import { CustomerToPersistence } from "./CustomerMapperType";

export class CustomerMapper {
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

  public static toDomain(rawCustomer: Record<string, string>, location: LocationToPersistence): Customer {
    return Customer.create({
      name: {
        title: rawCustomer.title,
        first: rawCustomer.first_name,
        last: rawCustomer.last_name,
      },
      type: 'customers',
      cell: rawCustomer.cell,
      dob: {
        age: 0,
        date: new Date(rawCustomer.birth_date)
      },
      email: rawCustomer.email,
      gender: rawCustomer.gender,
      location: {
        street: location.street,
        city: location.city,
        state: location.state,
        postcode: location.postcode,
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        timezone: {
          description: location.description,
          offset: location.off
        }
      },
      phone: rawCustomer.phone,
      picture: {
        large: rawCustomer.large,
        medium: rawCustomer.medium,
        thumbnail: rawCustomer.thumbnail
      },
      registered: {
        age: 0,
        date: new Date(rawCustomer.registered)
      },
      role_id: '3'
    })
  }
}