import { NameType, PersonProps } from "../../../shared/types";

export interface CustomerProps extends Omit<PersonProps, 'occupation' | 'name' | 'id'> {
  role?: string
  name: NameType
}
