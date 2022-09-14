import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Customer } from "../../domain/Customer";
import { RequestUpdateCustomerDTO, UpdateCustomerDTO } from "../dtos/UpdateCustomerDTO";
import { UpdateCustomerToPersistence } from "./UpdateCustomerMapperType";

export class UpdateCustomerMapper {
  public static toDomain(updateCustomerDTO: RequestUpdateCustomerDTO): Customer {
    return Customer.create({
      name: updateCustomerDTO.name,
      email: updateCustomerDTO.email,
      gender: updateCustomerDTO.gender,
      dob: {
        date: updateCustomerDTO.birthdate,
        age: new Date().getFullYear() - new Date(updateCustomerDTO.birthdate).getFullYear()
      },
      registered: {
        date: updateCustomerDTO.registered,
        age: new Date().getFullYear() - new Date(updateCustomerDTO.registered).getFullYear()
      },
      phone: updateCustomerDTO.phone.main,
      cell: updateCustomerDTO.phone.cell,
      picture: updateCustomerDTO.picture,
      location: updateCustomerDTO.location,
      role_id: updateCustomerDTO.role_id.toString(),
      type: 'customers',
    }, new UniqueEntityID(updateCustomerDTO.id))
  }

  public static toDTO(customer: Record<string, any>): UpdateCustomerDTO {
    return {
      id: customer.id.toString(),
      name: {
        title: customer.name.title,
        firstName: customer.name.firstName,
        lastName: customer.name.lastName,
      },
      email: customer.email,
      gender: customer.gender,
      phone: customer.phone,
      cell: customer.cell,
      picture: {
        thumbnail: customer.picture.thumbnail,
        medium: customer.picture.medium,
        large: customer.picture.large
      },
      role_id: customer.role_id
    }
  }

  public static toPersistence(customer: RequestUpdateCustomerDTO): UpdateCustomerToPersistence {
    return {
      customer: {
        customer_id: customer.id,
        created_on: new Date().toISOString(),
        title: customer.name?.title,
        first_name: customer.name?.firstName,
        last_name: customer.name?.lastName,
        email: customer.email,
        gender: customer.gender,
        birth_date: customer.birthdate,
        registered: customer.registered,
        phone: customer.phone.main,
        cell: customer.phone.cell,
        thumbnail: customer.picture?.thumbnail,
        medium: customer.picture?.medium,
        large: customer.picture?.large,
        role_id: customer.role_id,
      },
      location: {
        id: customer.location.id!,
        street: customer.location.street,
        city: customer.location.city,
        state: customer.location.state,
        postcode: customer.location.postcode,
        coordinates: customer.location.coordinates,
        timezone: customer.location.timezone,
      }
    }
  }
}