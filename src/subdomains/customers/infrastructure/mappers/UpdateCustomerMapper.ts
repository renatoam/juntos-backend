import { RequestUpdateCustomerDTO, UpdateCustomerDTO } from "../dtos/UpdateCustomerDTO";
import { UpdateCustomerToPersistence } from "./UpdateCustomerMapperType";

export class UpdateCustomerMapper {
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
        birth_date: customer.birthdate,
        registered: customer.registered,
        gender: customer.gender,
        phone: customer.phone.main,
        cell: customer.phone.cell,
        thumbnail: customer.picture?.thumbnail,
        medium: customer.picture?.medium,
        large: customer.picture?.large,
        role_id: customer.role_id,
      },
      location: {
        location_id: customer.location.id!,
        street: customer.location.street,
        city: customer.location.city,
        state: customer.location.state,
        postcode: customer.location.postcode,
        latitude: customer.location.coordinates.latitude,
        longitude: customer.location.coordinates.longitude,
        description: customer.location.timezone.description,
        off: customer.location.timezone.offset,
      }
    }
  }
}