import { INSERT_DYNAMIC_CUSTOMER, INSERT_DYNAMIC_EMPLOYEE, INSERT_DYNAMIC_LOCATION } from '../constants'
import { INSERTING_DATA_ERROR } from '../constants/messages'
import { PersonType } from '../types'
import { insertInitialLocationData, insertInitialPersonData } from './insertInitialData'

export async function populateDatabase() {
  try {
    await insertInitialLocationData(PersonType.customers, INSERT_DYNAMIC_LOCATION)
  } catch (error) {
    console.error(INSERTING_DATA_ERROR)
  }

  try {
    await insertInitialPersonData(PersonType.customers, INSERT_DYNAMIC_CUSTOMER)
    await insertInitialPersonData(PersonType.employees, INSERT_DYNAMIC_EMPLOYEE)
  } catch (error) {
    console.error(INSERTING_DATA_ERROR)
  }
}

