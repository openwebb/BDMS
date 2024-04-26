import IAddTaskUsecase from '../usecases/addTaskUsecase'
import AddTaskUsecase from '../usecases/addTaskUsecase'
import IEditTaskUsecase from '../usecases/editTaskUsecase'
import EditTaskUsecase from '../usecases/editTaskUsecase'
import IDeleteTaskUsecase from '../usecases/deleteTaskUsecase'
import DeleteTaskUsecase from '../usecases/deleteTaskUsecase'
import IGetAllTasksUsecase from '../usecases/getAllTasksUsecase'
import GetAllTasksUsecase from '../usecases/getAllTasksUsecase'
import IGetTaskUsecase from '../usecases/getTaskUsecase'
import GetTaskUsecase from '../usecases/getTaskUsecase'
import TodoRepository from '../repositories/todoRepository'
import TodoController from '../controllers/todoController'

export default class TodoService {
    private todoRepository: TodoRepository
    private addTaskUsecase: IAddTaskUsecase
    private editTaskUsecase: IEditTaskUsecase
    private deleteTaskUsecase: IDeleteTaskUsecase
    private getAllTasksUsecase: IGetAllTasksUsecase
    private getTaskUsecase: IGetTaskUsecase

    constructor() {
        this.todoRepository = new TodoRepository()
        this.addTaskUsecase = new AddTaskUsecase(this.todoRepository)
        this.editTaskUsecase = new EditTaskUsecase(this.todoRepository)
        this.deleteTaskUsecase = new DeleteTaskUsecase(this.todoRepository)
        this.getAllTasksUsecase = new GetAllTasksUsecase(this.todoRepository)
        this.getTaskUsecase = new GetTaskUsecase(this.todoRepository)
    }

    getController() {
        return new TodoController(
            this.addTaskUsecase,
            this.editTaskUsecase,
            this.deleteTaskUsecase,
            this.getAllTasksUsecase,
            this.getTaskUsecase
        )
    }
}