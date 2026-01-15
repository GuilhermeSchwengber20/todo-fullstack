import { Todo } from "./Todo";

export default interface ITodoRepository {

    add(todo: Todo): Promise<Todo>;
}