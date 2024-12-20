const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0123456789',
  database: 'db_posts'
})

connection.connect((err) => {
  if (err) throw err
  console.log('Connesione riuscita')
})

module.exports = connection