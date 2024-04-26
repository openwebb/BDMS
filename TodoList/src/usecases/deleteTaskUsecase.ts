import ITodoRepository from '../repositories/todoRepository'
import TodoRepository from '../repositories/todoRepository'

export default interface IDeleteTaskUsecase {
    execute(todoId: string): Promise<void>
}

export default class DeleteTaskUsecase implements IDeleteTaskUsecase{
    private todoRepository: ITodoRepository

    constructor(todoRepository: ITodoRepository = new TodoRepository()) {
        this.todoRepository = todoRepository
    }

    async execute(id: string): Promise<void> {
        const task = await this.todoRepository.getById(id)
        if (!task) {
            throw new Error('Task not found')
        }

        return this.todoRepository.delete(id)
    }
}