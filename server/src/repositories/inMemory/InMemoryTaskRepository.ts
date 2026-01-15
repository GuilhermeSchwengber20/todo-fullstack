import ITaskRepository from "../../models/ITaskRepository";
import { Task } from "../../models/Task";

class TaskRepository implements ITaskRepository {
    
    private _todos: Task[] = [];

    constructor() {
        this._todos = [];
    }

    async add(todo: Task): Promise<Task> {
        this._todos.push(todo)
        return todo
    }

    async complete(task: Task): Promise<Task> {
        const taskIndex = this._todos.findIndex(t => t.id === task.id && t.userId === task.userId);

        if (taskIndex === -1) {
            throw new Error("Tarefa não encontrada");
        }
        this._todos[taskIndex].completed = true;

        return this._todos[taskIndex];
    }

    async delete(task: Task): Promise<Task> {
        const taskIndex = this._todos.findIndex(t => task.id === t.id && t.userId === task.userId);
        if (taskIndex === -1) {
            throw new Error("Tarefa não encontrada");
        }
        this._todos[taskIndex].deletedAt = new Date();

        return this._todos[taskIndex];
    }

    findByUserAndId(userId: string, id_task: string): Task | null {
        const task = this._todos.find(task => task.userId === userId && task.id === id_task);
        return task || null;
    }

    async update(task: Task): Promise<Task> {
        const taskIndex = this._todos.findIndex(t => t.id === task.id && t.userId === task.userId);
        if (taskIndex === -1) {
            throw new Error("Tarefa não encontrada");
        }
        this._todos[taskIndex] = task;
        return this._todos[taskIndex]
    }

    async listAllByUserAndNotDeleted(userId: string): Promise<Task[]> {
        return this._todos.filter(task => task.userId === userId && task.deletedAt === null);
    }
}

export default TaskRepository;