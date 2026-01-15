import { v4 } from "uuid";
import { Task } from "../models/Task";

import TaskRepository from "../repositories/inMemory/TaskRepository";

class TaskService {

    constructor(private readonly taskRepository: TaskRepository) {}

    async add (todo: { title: string, description: string, userId: string }): Promise<Task> {
        const registeredTodo: Task = await this.taskRepository.add({
            ...todo,
            completed: false,
            deletedAt: null,
            id: v4()
        });
        return registeredTodo
    }

    async complete (data: { id_task: string, userId: string }): Promise<Task> {
        const task = this.taskRepository.findByUserAndId(data.userId, data.id_task);
        if(!task) {
            throw new Error("Tarefa não encontrada");
        }

        if (task?.completed) {
            throw new Error("Esssa tarefa ja foi concluida, meu consagrado!");
        }

        const completedTask: Task = await this.taskRepository.complete(task);
        return completedTask
    }

    async delete (data: { id_task: string, userId: string }): Promise<Task> {
        const task = this.taskRepository.findByUserAndId(data.userId, data.id_task);
        if(!task) {
            throw new Error("Tarefa não encontrada");
        }

        if (task?.completed) {
            throw new Error("Esssa tarefa já foi deletada, meu consagrado!");
        }

        const completedTask: Task = await this.taskRepository.delete(task);
        return completedTask

    }

    async update (data: { id_task: string, userId: string, title: string, description?: string }): Promise<Task> {
        console.log(data);
        const task = this.taskRepository.findByUserAndId(data.userId, data.id_task);
        if(!task) {
            throw new Error("Tarefa não encontrada");
        }

        const updatedTask: Task = await this.taskRepository.update({
            ...task,
            title: data.title,
            description: data.description,
        });

        return updatedTask
    }

    async listAll(userId: string): Promise<Task[]> {
        const tasks = this.taskRepository.listAllByUserAndNotDeleted(userId)

        return tasks
    }
}

export default TaskService;