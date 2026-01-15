import { Task } from "./Task";

export default interface ITaskRepository {

    add(todo: Task): Promise<Task>;
}