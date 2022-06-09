import { Entity } from "../../shared/domain/Entity";
import { UniqueEntityID } from "../../shared/domain/UniqueEntityID";
import { CustomerProps } from "./CustomerTypes";

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

  private constructor(props: CustomerProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: CustomerProps, id?: UniqueEntityID): Customer | null {
    const { name, email } = props

    const customerName = !!name
    const customerEmail = !!email

    if (!customerName || !customerEmail) return null

    return new Customer(props, id)
  }
}
