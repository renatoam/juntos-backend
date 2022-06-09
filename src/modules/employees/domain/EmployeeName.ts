import { ValueObject } from "@backend/shared/domain/ValueObject";

interface EmployeeNameProps {
  name: string
}

const MAX_LENGTH_ALLOWED = 15
const MIN_LENGTH_ALLOWED = 2

export class EmployeeName extends ValueObject<EmployeeNameProps> {
  public static maxLength: number = MAX_LENGTH_ALLOWED;
  public static minLength: number = MIN_LENGTH_ALLOWED;

  get value() {
    return this.props.name
  }

  private constructor(props: EmployeeNameProps) {
    super(props)
  }

  public static create(props: EmployeeNameProps): EmployeeName | string {
    if (!props.name) return 'Please, you need inform a name'

    if (props.name.length > this.maxLength) return `Name could not exceed ${this.maxLength} characters`

    if (props.name.length < this.minLength) return `Name shoud have at least ${this.minLength} characters`

    return new EmployeeName(props)
  }
}
