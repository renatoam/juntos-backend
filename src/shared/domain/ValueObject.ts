interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = props;
  }

  public equals(valueObject?: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }

    if (valueObject.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
  }
}
