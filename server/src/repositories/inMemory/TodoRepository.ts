import ITodoRepository from "../../models/ITodoRepository";
import { Todo } from "../../models/Todo";

class TodoRepository implements ITodoRepository {
    
    private _todos: Todo[] = [];

    constructor() {
        this._todos = [];
    }

    async add(todo: Todo): Promise<Todo> {
        this._todos.push(todo);
        return todo;
    }
}

export default TodoRepository;