import { ValueObject } from "../../../../shared/domain/ValueObject"
import { NameType } from "../../../../shared/types"

export class CustomerName extends ValueObject<NameType> {
  public static maxLength: number = 15
  public static minLength: number = 2
  public static titles: string[] = ['miss', 'ms', 'mister', 'mr', 'mrs']

  private constructor(props: NameType) {
    super(props)
  }

  get fullname() {
    return `${this.props.title} ${this.props.firstName} ${this.props.lastName}`
  }

  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  public static create(props: NameType): CustomerName | null {
    const { title, firstName, lastName } = props

    const first = !!firstName
    const last = !!lastName

    if (title && !this.titles.includes(title)) return null
    if (!first || !last) return null
    if (firstName.length < this.minLength || lastName.length < this.minLength) return null
    if (firstName.length > this.maxLength || lastName.length > this.maxLength) return null

    return new CustomerName(props)
  }
}
