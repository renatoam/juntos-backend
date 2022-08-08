import { INSERT_DYNAMIC_CUSTOMER, INSERT_DYNAMIC_EMPLOYEE, INSERT_DYNAMIC_LOCATION } from '../constants'
import { INSERTING_DATA_ERROR } from '../constants/messages'
import { insertInitialLocationData, insertInitialPersonData } from './insertInitialData'

export async function populateDatabase() {
  try {
    await insertInitialLocationData('customers', INSERT_DYNAMIC_LOCATION)
  } catch (error) {
    console.error({
      source: 'Inserting location',
      message: INSERTING_DATA_ERROR,
      details: error
    })
  }

  try {
    await insertInitialPersonData('customers', INSERT_DYNAMIC_CUSTOMER)
    await insertInitialPersonData('employees', INSERT_DYNAMIC_EMPLOYEE)
  } catch (error) {
    console.error({
      source: 'Inserting customers and employees',
      message: INSERTING_DATA_ERROR,
      details: error
    })
  }
}

