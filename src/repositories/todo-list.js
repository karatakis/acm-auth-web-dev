const mysql = require('mysql')
const connection = require('../dependencies/database')
const util = require('util')

async function getTodos() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `todos`', (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(results)
        })
    })
}

function saveTodo(todo, callback) {
    let sql = "INSERT INTO `todos` (`title`, `description`, `priority`) VALUES (?, ?, ?);"
    let inserts = [todo.title, todo.description, todo.priority]
    sql = mysql.format(sql, inserts)
    return connection.query(sql, callback)
}

function deleteTodo(index, callback) {
    let sql = "DELETE FROM `todos` WHERE `todos`.`id` = ?"
    let inserts = [index]
    sql = mysql.format(sql, inserts)
    return connection.query(sql, callback)
}

function updateTodo(id, data, callback) {
    let sql = "UPDATE `todos` SET `title` = ?, `description` = ?, `priority` = ? WHERE `todos`.`id` = ?"
    let inserts = [data.title, data.description, data.priority, id]
    sql = mysql.format(sql, inserts)
    return connection.query(sql, callback)
}

module.exports = {
    getTodos,
    saveTodo,
    deleteTodo,
    updateTodo
}