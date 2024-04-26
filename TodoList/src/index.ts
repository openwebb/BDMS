import express from 'express'
import TodoService from './services/todoService'

const app = express()
app.use(express.json())

const todoService = new TodoService()
const todoController = todoService.getController()

app.post('/task', todoController.addTask.bind(todoController))
app.put('/task', todoController.editTask.bind(todoController))
app.delete('/task/:id', todoController.deleteTask.bind(todoController))
app.get('/tasks', todoController.getAllTasks.bind(todoController))
app.get('/task/:id', todoController.getTask.bind(todoController))

app.listen(3000, () => console.log('Server is running on port 3000'))