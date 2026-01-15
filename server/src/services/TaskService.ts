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
}

export default TaskService;