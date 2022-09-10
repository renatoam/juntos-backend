import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { LocationType } from "../../../shared/types";

export class Location extends Entity<LocationType> {
  get street() {
    return this.props.street
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get postcode() {
    return this.props.postcode
  }

  get coordinates() {
    return this.props.coordinates
  }

  get timezone() {
    return this.props.timezone
  }

  get id() {
    return this._id.toString()
  }

  private constructor(props: LocationType, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: LocationType, id?: UniqueEntityID): Location {
    return new Location(props, id)
  }
}
