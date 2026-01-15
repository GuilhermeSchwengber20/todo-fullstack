import ITaskRepository from "../../models/ITaskRepository";
import { Task } from "../../models/Task";

class TaskRepository implements ITaskRepository {
    
    private _todos: Task[] = [];

    constructor() {
        this._todos = [];
    }

    async add(todo: Task): Promise<Task> {
        this._todos.push(todo);
        return todo;
    }
}

export default TaskRepository;