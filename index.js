const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./src/dependencies/database')
connection.connect()
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

app.get('/todo', async (req, res) => {
    // try {
    //     let todos = await todoRepository.getTodos()
    //     res.render('todos', {todos})
    // } catch (error) {
    //     res.send('error')
    //     console.error(error)
    // }
    todoRepository.getTodos()
    .then((todos) => {
        res.send(todos)
    })
    .catch((error) => {
        res.send('error')
        console.error(error)
    })
})

app.post('/todo', (req, res) => {
    todoRepository.saveTodo(req.body, (error) => {
        if (error) {
            res.send('error')
            console.error(error)
            return
        }
        res.redirect('/todo')
    })
})

app.delete('/todo', (req, res) => {
    todoRepository.deleteTodo(req.body.id, (error) => {
        if (error) {
            res.sendStatus(400)
            return
        }
        res.sendStatus(200)
    })
})

app.put('/todo', (req, res) => {
    todoRepository.updateTodo(req.body.id, req.body.data, (error) => {
        if (error) {
            res.sendStatus(400)
            return
        }
        res.sendStatus(200)
    })
})

app.listen(port, () => {
    console.log('Server running at http://localhost:' + port)
})