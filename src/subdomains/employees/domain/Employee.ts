import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Occupation } from "../types";
import { EmployeeId } from "./EmployeeId";
import { EmployeeName } from "./EmployeeName";
import { EmployeeProps } from "./EmployeeProps";

export class Employee extends Entity<EmployeeProps> {
  get id(): UniqueEntityID {
    return EmployeeId.create(this._id).id
  }

  get name(): EmployeeName {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get occupation(): Occupation {
    return this.props.occupation
  }

  get birthday(): Date {
    return this.props.birthday
  }

  get hire(): Date {
    return this.props.hire
  }

  private constructor(props: EmployeeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  // Implement Result class
  public static create(props: EmployeeProps, id?: UniqueEntityID): Employee | string {
    // Implement guardAgainstNullOrUndefined
    if (!props.name || !props.email) return 'Name and email cannot be null'

    const employeeId = id ? id : new UniqueEntityID()

    return new Employee(props, employeeId)
  }
}


