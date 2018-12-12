const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))

const port = 3000

const todoRepository = require('./src/repositories/todo-list')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/todo', (req, res) => {
    const todos = todoRepository.getTodos()
    res.render('todos', {todos})
})

app.post('/todo', (req, res) => {
    todoRepository.saveTodo(req.body)
    res.redirect('/todo')
})

app.delete('/todo', (req, res) => {
    todoRepository.deleteTodo(req.body.index)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log('Server running at http://localhost:' + port)
})