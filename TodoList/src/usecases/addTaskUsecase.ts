import ITask from '../entities/task'
import Task from '../entities/task'
import ITodoRepository from '../repositories/todoRepository'
import TodoRepository from '../repositories/todoRepository'

export default interface IAddTaskUsecase {
    execute(data: any): Promise<ITask>
}

export default class AddTaskUsecase implements IAddTaskUsecase {
    private todoRepository: ITodoRepository

    constructor(todoRepository: ITodoRepository = new TodoRepository()) {
        this.todoRepository = todoRepository
    }

    async execute(data: any): Promise<ITask> {
        if (!data.title || !data.description || data.completed === undefined) {
            throw new Error('Missing required fields')
        }

        const task = new Task(
            this.generateRandomId(10),
            data.title,
            data.description,
            data.completed
        )

        return this.todoRepository.add(task)
    }

    private generateRandomId(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters.charAt(randomIndex)
        }

        return result
    }
}
