import { ValueObject } from "@backend/shared/domain/ValueObject";

interface EmployeeEmailProps {
  email: string
}

export class EmployeeEmail extends ValueObject<EmployeeEmailProps> {

}
