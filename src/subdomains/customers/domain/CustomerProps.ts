import { PersonProps } from "../../../shared/types";

export interface CustomerProps extends Omit<PersonProps, 'occupation'> {}
