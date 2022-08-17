import { client } from "../../../../shared/infrastructure/database/postgres";
import { CustomerRepository } from "./CustomerRepository";
import { Customer } from "../../domain/Customer";
import { CustomerMapper } from "../mappers/CustomerMapper";

type FieldType = keyof Customer

export class CustomCustomerRepository implements CustomerRepository {
  async update(customerEmail: string, updatedFields: Partial<Customer>): Promise<void> {
    const fieldsToUpdate = Object.keys(updatedFields) as FieldType[]
    const querySetStatement = fieldsToUpdate.map((field: FieldType) => `${field} = '${updatedFields[field]}'`)
    const query = `UPDATE customers SET ${querySetStatement.join(',')} WHERE email = '${customerEmail}';`
    
    await client.query(query)
  }

  async exists(customerEmail: string): Promise<boolean> {
    const result = await client.query(`SELECT * FROM customers WHERE email = '${customerEmail}';`)

    return !!result.rows.length
  }
  
  async save(customer: Customer): Promise<void> {
    const newCustomer = CustomerMapper.toPersistence(customer)
    const insertQueryFields = Object.keys(newCustomer)
    const insertQueryValues = Object.values(newCustomer).map(value => `'${value}'`)
    const query = `INSERT INTO customers(${insertQueryFields}) VALUES(${insertQueryValues});`

    await client.query(query)
  }

  async remove(customerEmail: string): Promise<boolean> {
    const query = `DELETE FROM customers WHERE email = '${customerEmail}';`
    const response = await client.query(query)

    return !!response.rowCount
  }

  getCustomerById(_customerId: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  
  async getCustomerByEmail(customerEmail: string): Promise<any> {
    const result = await client.query(`SELECT * FROM customers WHERE email = '${customerEmail}';`)

    // Se precisar consultar ooutro banco ou outra tabela, também faço aqui
    // Organizo todos esses dados numa coisa só através de um DTO

    // On save(), check if the entity already exists and then perform the create or update.
    // With respect to doing the "create if not exists, else update", that's the type of complex data access logic that we don't want any other constructs in our domain to have to know about: only the repos should care about that.
    // https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/
    // lançar um DTO NA CONTROLLERS: persistencia pra domain

    // Criar o mapper aqui
    // From Domain to DTO
    // From Domain to Persistence
    // From Persistence to Domain
    return result.rows[0] 
  }
  
  async getAllCustomers(): Promise<Customer[]> {
    const result = await client.query('SELECT * FROM customers LIMIT 20;')
    
    return result.rows
  }
}
