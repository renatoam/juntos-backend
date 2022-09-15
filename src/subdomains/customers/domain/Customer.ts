import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
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

  get birthdate() {
    return this.props.birthdate
  }

  get registered() {
    return this.props.registered
  }

  get phone() {
    return this.props.phone
  }

  get picture() {
    return this.props.picture
  }

  get type() {
    return this.props.type
  }

  get role() {
    return this.props.role
  }

  get id() {
    return this._id.toString()
  }

  private constructor(props: CustomerProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: CustomerProps, id?: UniqueEntityID): Customer {
    return new Customer(props, id)
  }
}
