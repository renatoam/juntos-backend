import { checkIfEmployeeExistsUseCase } from '../../index'
import { CheckEmployeeDTO } from '../../types'

describe('[Use Case] Check Employee', () => {
  it('should be a test', async () => {
    const checkEmployeeDTO: CheckEmployeeDTO = {
      id: 1,
      email: 'test@outlook.com'
    }
    const employeeExists = await checkIfEmployeeExistsUseCase.execute(checkEmployeeDTO)

    expect(employeeExists).toBe(true)
  })
})