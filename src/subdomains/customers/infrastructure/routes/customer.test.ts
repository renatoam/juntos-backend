import request from 'supertest';
import { app } from '../../../../server';
import { IdentifierType } from '../../../../shared/types';
import { Customer } from '../../domain/Customer';
import { CustomerProps } from '../../domain/CustomerProps';

describe('Customer Routes', () => {
  const id: IdentifierType = '1dd0a949-7f9c-4b11-844f-5db5278bda45'
    const mockProps: CustomerProps = {
      name: {
        first: 'Renato',
        last: 'Alves',
        title: 'Mr'
      },
      type: 'employees'
    }

  it('should return status code 200', async () => {
    const response = await request(app)
      .get('/api/v1/customers')
    
    expect(response.status).toBe(200)
  })
  
  it('should return a customer list', async () => {
    const customer = Customer.create(mockProps, id)
    const customers = [customer]
    const response = await request(app)
      .get('/api/v1/customers')
    const sut = response.body.customers as Customer[]
    
    console.log('Response', { response: response.body.customers, customers })
    expect(sut[0]).toMatchObject<Customer>(customer)
  })
})
