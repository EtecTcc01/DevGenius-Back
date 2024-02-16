import mysql2 from 'mysql2/promise'

async function connect() { 
  return await mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    password: '',
    database: 'bd_tcc',
    user: 'root'
  })
}

export default {connect};

// O ABAIXO É PRO SENAC (POSSUI DADOS DE CONFIG DO BANCO DIFERENTES)

// import mysql2 from 'mysql2/promise'

// async function connect() { 
//   return await mysql2.createConnection({
//     host: 'localhost',
//     port: 3306,
//     password: 'admin',
//     database: 'bd_tcc',
//     user: 'root'
//   })
// }

// export default {connect};