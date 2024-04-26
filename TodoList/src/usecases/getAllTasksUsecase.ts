import ITask from '../entities/task'
import ITodoRepository from '../repositories/todoRepository'
import TodoRepository from '../repositories/todoRepository'

export default interface IGetAllTasksUsecase {
    execute(): Promise<ITask[]>
}

export default class GetAllTasksUsecase implements IGetAllTasksUsecase {
    private todoRepository: ITodoRepository

    constructor(todoRepository: ITodoRepository = new TodoRepository()) {
        this.todoRepository = todoRepository
    }

    async execute(): Promise<ITask[]> {
        return this.todoRepository.getAll()
    }
}