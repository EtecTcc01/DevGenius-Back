import mysql2 from 'mysql2/promise'

// async function connect() {
//   return await mysql2.createConnection({
//     host: 'viaduct.proxy.rlwy.net',
//     port: 37756,
//     password: 'nAlFBoJQCfUdXtgzcpDUaLrLetFYZOhG',
//     database: 'db_devgenius',
//     user: 'root'
//   })
// }

async function connect() {
  return await mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    password: '',
    database: 'db_devgenius',
    user: 'root'
  })
}

export default { connect };