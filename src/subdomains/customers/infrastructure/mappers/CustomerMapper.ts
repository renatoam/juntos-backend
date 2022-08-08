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
}