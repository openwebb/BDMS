import ITask from '../entities/task'
import ITodoRepository from '../repositories/todoRepository'
import TodoRepository from '../repositories/todoRepository'

export default interface IGetTaskUsecase {
    execute(id: string): Promise<ITask | null>
}

export default class GetTaskUsecase implements IGetTaskUsecase {
    private todoRepository: ITodoRepository

    constructor(todoRepository: ITodoRepository = new TodoRepository()) {
        this.todoRepository = todoRepository
    }

    async execute(id: string): Promise<ITask | null> {
        if (!id) {
            throw new Error('Task ID is required')
        }

        return this.todoRepository.getById(id)
    }
}