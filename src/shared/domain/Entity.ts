import { randomUUID } from "crypto";
import { IdentifierType } from "../types";

export abstract class Entity<T> {
  protected readonly _id: IdentifierType;
  public readonly props: T;

  constructor(props: T, id?: IdentifierType) {
    this._id = id ? id : randomUUID();
    this.props = props;
  }
}
