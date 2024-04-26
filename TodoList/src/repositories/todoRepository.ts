import ITask from '../entities/task'

export default interface ITodoRepository {
    add(task: ITask): Promise<ITask>
    update(task: ITask): Promise<ITask | null>
    delete(id: string): Promise<void>
    getById(id: string): Promise<ITask | null>
    getAll(): Promise<ITask[]>
}

export default class TodoRepository implements ITodoRepository {
    private tasks: ITask[] = []

    async add(task: ITask): Promise<ITask> {
        this.tasks.push(task)
        return task
    }

    async update(task: ITask): Promise<ITask | null> {
        const index = this.tasks.findIndex(_task => _task.id === task.id)
        if (index === -1) {
            return null
        }

        const updatedTask = { ...this.tasks[index], ...task }
        this.tasks[index] = updatedTask
        return updatedTask
    }

    async delete(id: string): Promise<void> {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    async getById(id: string): Promise<ITask | null> {
        return this.tasks.find(task => task.id === id) || null
    }

    async getAll(): Promise<ITask[]> {
        return this.tasks
    }
}