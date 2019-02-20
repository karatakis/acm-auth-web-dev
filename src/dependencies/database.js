const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'todo_app',
    password: 'todo_app',
    database: 'todo_app'
})

module.exports = connection