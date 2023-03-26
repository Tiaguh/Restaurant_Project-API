import mysql2 from 'mysql2/promise'

async function connect () {
  const connection = await mysql2.createConnection(process.env.DATABASE)

  return connection

}

export default {connect};