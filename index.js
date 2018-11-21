const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const port = 3000

const todoRepository = require('./src/repositories/todo-list')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/todo', (req, res) => {
    let page = '<h1 id="title">TODO</h1>'
    const todos = todoRepository.getTodos()
    page += '<ul>'
    todos.forEach((item) => {
        page += '<li>'
        page += item.title
        page += '</li>'
    })
    page += '</ul>'
    page += '<form action="/todo" method="post" >'
    page += '<input type="text" name="title" placeholder="Title"><br>'
    page += '<input type="text" name="description" placeholder="Description"><br>'
    page += '<input type="number" name="priority" placeholder="5"><br>'
    page += '<input type="submit" value="Submit">'
    page += '</form>'
    res.send(page)
})

app.post('/todo', (req, res) => {
    todoRepository.saveTodo(req.body)
    res.redirect('/todo')
})

app.listen(port, () => {
    console.log('Server running at http://localhost:' + port)
})