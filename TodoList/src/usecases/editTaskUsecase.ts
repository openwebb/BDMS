import ITask from '../entities/task'
import ITodoRepository from '../repositories/todoRepository'
import TodoRepository from '../repositories/todoRepository'

export default interface IEditTaskUsecase {
    execute(task: ITask): Promise<ITask | null>
}

export default class EditTaskUsecase implements IEditTaskUsecase {
    private todoRepository: ITodoRepository

    constructor(todoRepository: ITodoRepository = new TodoRepository()) {
        this.todoRepository = todoRepository
    }

    async execute(task: ITask): Promise<ITask | null> {
        if (!task.title && !task.description && task.completed === undefined) {
            throw new Error('Nothing to update')
        }
        
        return this.todoRepository.update(task)
    }
}
