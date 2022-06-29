import { PersonProps } from "../../../shared/types"
import { Occupation } from "../types"

export interface EmployeeProps extends PersonProps {
  occupation?: Occupation
}