export default interface ITask {
    id: string
    title: string
    description: string
    completed: boolean
}

export default class Task implements ITask {
    id: string
    title: string
    description: string
    completed: boolean

    constructor(id: string, title: string, description: string, completed: boolean) {
        this.id = id
        this.title = title
        this.description = description
        this.completed = completed
    }
}