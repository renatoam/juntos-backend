import { Entity } from "../../../shared/domain/Entity";
import { IdentifierType } from "../../../shared/types";
import { CustomerProps } from "./CustomerProps";

export class Customer extends Entity<CustomerProps> {
  get gender() {
    return this.props.gender
  }

  get name() {
    return this.props.name
  }

  get location() {
    return this.props.location
  }

  get email() {
    return this.props.email
  }

  get dob() {
    return this.props.dob
  }

  get registered() {
    return this.props.registered
  }

  get phone() {
    return this.props.phone
  }

  get cell() {
    return this.props.cell
  }

  get picture() {
    return this.props.picture
  }

  get type() {
    return this.props.type
  }

  
  get role_id() {
    return this.props.role_id
  }

  get id() {
    return this._id
  }

  private constructor(props: CustomerProps, id?: IdentifierType) {
    super(props, id)
  }

  public static create(props: CustomerProps, id?: IdentifierType): Customer {
    return new Customer(props, id)
  }
}
