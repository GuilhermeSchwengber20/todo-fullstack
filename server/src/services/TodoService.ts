import { v4 } from "uuid";
import { Todo } from "../models/Todo";

import TodoRepository from "../repositories/inMemory/TodoRepository";

class TodoService {

    constructor(private readonly todoRepository: TodoRepository) {}


    async add (todo: { title: string, description: string, userId: string }): Promise<Todo> {
        const registeredTodo: Todo = await this.todoRepository.add({
            ...todo,
            completed: false,
            deletedAt: null,
            id: v4()
        });
        return registeredTodo
    }
}

export default TodoService;