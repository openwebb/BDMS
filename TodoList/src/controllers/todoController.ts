import { Request, Response } from 'express'
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
import Task from '../entities/task'

export default class TodoController {
    private addTaskUsecase: IAddTaskUsecase
    private editTaskUsecase: IEditTaskUsecase
    private deleteTaskUsecase: IDeleteTaskUsecase
    private getAllTasksUsecase: IGetAllTasksUsecase
    private getTaskUsecase: IGetTaskUsecase

    constructor(
        addTaskUsecase: IAddTaskUsecase = new AddTaskUsecase(),
        editTaskUsecase: IEditTaskUsecase = new EditTaskUsecase(),
        deleteTaskUsecase: IDeleteTaskUsecase = new DeleteTaskUsecase(),
        getAllTasksUsecase: IGetAllTasksUsecase = new GetAllTasksUsecase(),
        getTaskUsecase: IGetTaskUsecase = new GetTaskUsecase()
    ) {
        this.addTaskUsecase = addTaskUsecase
        this.editTaskUsecase = editTaskUsecase
        this.deleteTaskUsecase = deleteTaskUsecase
        this.getAllTasksUsecase = getAllTasksUsecase
        this.getTaskUsecase = getTaskUsecase
    }

    async addTask(req: Request, res: Response) {
        try {
            const { body } = req
            const task: Task = await this.addTaskUsecase.execute(body)
            res.status(201).json(task)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message })
        }
    }

    async editTask(req: Request, res: Response) {
        try {
            const { body } = req
            const updatedTask: Task | null = await this.editTaskUsecase.execute(body)
            if (updatedTask) {
                res.json(updatedTask)
            } else {
                res.status(404).json({ message: 'Task not found' })
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message })
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.params
            await this.deleteTaskUsecase.execute(id)
            res.status(204).end()
        } catch (error) {
            res.status(400).json({ message: (error as Error).message })
        }
    }

    async getAllTasks(req: Request, res: Response) {
        try {
            const tasks: Task[] = await this.getAllTasksUsecase.execute()
            res.json(tasks)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message })
        }
    }

    async getTask(req: Request, res: Response) {
        try {
            const { id } = req.params
            const task: Task | null = await this.getTaskUsecase.execute(id)
            if (task) {
                res.json(task)
            } else {
                res.status(404).json({ message: 'Task not found' })
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message })
        }
    }
}
