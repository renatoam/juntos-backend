import { JSONFile, Low } from 'lowdb';

const adapter = new JSONFile('db.json')
const lowDB = new Low(adapter)
const initLowDB = async () => await lowDB.read()

initLowDB()

export { lowDB };
