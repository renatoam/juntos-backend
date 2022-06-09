import { ValueObject } from "../../../shared/domain/ValueObject"

interface CustomerNameProps {
  title: string
  first: string
  last: string
}

export class CustomerName extends ValueObject<CustomerNameProps> {
  public static maxLength: number = 15
  public static minLength: number = 2
  public static titles: string[] = ['miss', 'ms', 'mister', 'mr', 'mrs']

  private constructor(props: CustomerNameProps) {
    super(props)
  }

  get fullname() {
    return `${this.props.title} ${this.props.first} ${this.props.last}`
  }

  get firstname() {
    return this.props.first
  }

  get lastname() {
    return this.props.last
  }

  public static create(props: CustomerNameProps): CustomerName | null {
    const { title, first, last } = props

    const firstname = !!first
    const lastname = !!last

    if (title && !this.titles.includes(title)) return null
    if (!firstname || !lastname) return null
    if (first.length < this.minLength || last.length < this.minLength) return null
    if (first.length > this.maxLength || last.length > this.maxLength) return null

    return new CustomerName(props)
  }
}
