import { NameType, PersonProps, PhoneType, RoleType } from "../../../shared/types";

type CustomPersonProps = Pick<PersonProps, 'type' | 'gender' | 'location' | 'email' | 'picture'>

export interface CustomerProps extends CustomPersonProps {
  role: RoleType
  name: NameType
  birthdate: Date
  registered: Date
  phone: PhoneType
}
