let todos = [
    {
        title: " Go to doctor",
        description: "Papanikolaou 15:10",
        priority: 10
    },
    {
        title: "Take flowers",
        description: "Roses @ Flower Shop",
        priority: 7
    },
    {
        title: "Go to class",
        description: "Linear Algebra @ 2:00",
        priority: 1
    },
    {
        title: "Fix car",
        description: "Broken pipe",
        priority: 3
    }
]

function getTodos() {
    return todos
}

function saveTodo(todo) {
    todos.push(todo)
}

function deleteTodo(index) {
    todos.splice(index, 1)
}

module.exports = {
    getTodos,
    saveTodo,
    deleteTodo
}