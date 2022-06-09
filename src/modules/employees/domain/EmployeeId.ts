import { Entity } from "@backend/shared/domain/Entity";
import { UniqueEntityID } from "@backend/shared/domain/UniqueEntityID";

export class EmployeeId extends Entity<any> {

  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id)
  }

  public static create(id?: UniqueEntityID): EmployeeId {
    return new EmployeeId(id)
  }
}
