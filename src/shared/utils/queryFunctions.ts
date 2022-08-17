export const insertInto = (table: string, fields: string[], values: string[]) => {
  const queryFields = fields.join(',')
  const queryValues = values.map(value => `'${value}'`).join(',')

  return `INSERT INTO ${table}(${queryFields}) VALUES (${queryValues});`
}
