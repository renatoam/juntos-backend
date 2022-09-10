export const insertInto = <T>(table: string, persistenceObject: Record<keyof T, unknown>) => {
  const insertQueryFields = Object.keys(persistenceObject).join(',')
  const insertQueryValues = Object.values(persistenceObject).map(value => `'${value}'`).join(',')

  return `INSERT INTO ${table}(${insertQueryFields}) VALUES (${insertQueryValues});`
}
