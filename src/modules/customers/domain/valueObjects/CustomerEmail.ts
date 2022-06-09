import { ValueObject } from "../../../shared/domain/ValueObject";

export interface CustomerEmailProps {
  value: string;
}

export class CustomerEmail extends ValueObject<CustomerEmailProps> {
  private constructor(props: CustomerEmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  private static isValidEmail(email: string) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): CustomerEmail | null {
    if (!this.isValidEmail(email)) return null

    return new CustomerEmail({ value: this.format(email) })
  }
}
