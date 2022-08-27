import {
  INSERTING_CUSTOMER_DATA_ERROR,
  INSERTING_CUSTOMER_LOCATION_DATA_ERROR,
  INSERTING_EMPLOYEE_DATA_ERROR,
  INSERTING_LOCATION_DATA_ERROR,
  INSERT_DYNAMIC_CUSTOMER,
  INSERT_DYNAMIC_EMPLOYEE,
  INSERT_DYNAMIC_LOCATION,
  INSERT_DYNAMIC_LOCATION_CUSTOMER,
  PERSON_TYPES
} from '../constants'
import {
  insertInitialCustomerData,
  insertInitialEmployeeData,
  insertInitialLocationCustomerData,
  insertInitialLocationData
} from './insertInitialData'
import { createPersonCollectionFromFile } from './miscellaneous'

export async function populateDatabase() {
  const refinedPerson = await createPersonCollectionFromFile(PERSON_TYPES)

  try {
    await insertInitialLocationData(INSERT_DYNAMIC_LOCATION, refinedPerson)
  } catch (error) {
    console.error({
      source: 'Inserting location',
      message: INSERTING_LOCATION_DATA_ERROR,
      details: error
    })

    throw Error(`${INSERTING_LOCATION_DATA_ERROR}. Details: ${error}`)
  }

  try {
    await insertInitialCustomerData(INSERT_DYNAMIC_CUSTOMER, refinedPerson)
  } catch (error) {
    console.error({
      source: 'Inserting customers',
      message: INSERTING_CUSTOMER_DATA_ERROR,
      details: error
    })

    throw Error(`${INSERTING_CUSTOMER_DATA_ERROR}. Details: ${error}`)
  }

  try {
    await insertInitialLocationCustomerData(INSERT_DYNAMIC_LOCATION_CUSTOMER, refinedPerson)
  } catch (error) {
    console.error({
      source: 'Inserting relations locations/customers',
      message: INSERTING_CUSTOMER_LOCATION_DATA_ERROR,
      details: error
    })

    throw Error(`${INSERTING_CUSTOMER_LOCATION_DATA_ERROR}. Details: ${error}`)
  }

  try {
    await insertInitialEmployeeData(INSERT_DYNAMIC_EMPLOYEE, refinedPerson)
  } catch (error) {
    console.error({
      source: 'Inserting employees',
      message: INSERTING_EMPLOYEE_DATA_ERROR,
      details: error
    })

    throw Error(`${INSERTING_EMPLOYEE_DATA_ERROR}. Details: ${error}`)
  }
}

