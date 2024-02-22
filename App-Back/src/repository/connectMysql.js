import mysql2 from 'mysql2/promise'

// Configuração padrão (localhost) do banco

// async function connect() { 
//   return await mysql2.createConnection({
//     host: 'localhost',
//     port: 3306,
//     password: '',
//     database: 'bd_tcc',
//     user: 'root'
//   })
// }

// Abaixo está um exemplo da conexão de banco feita pelo railway
// Crie a conexão usando as informações dada após criar o projeto mysql no railway

async function connect() { 
  return await mysql2.createConnection({
    host: 'monorail.proxy.rlwy.net',
    port: 54461,
    password: 'C2c-baC5H46EhAHA3Gh4Ahged5C1-6-G',
    database: 'railway',
    user: 'root'
  })
}

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

export default {connect};