import { Task } from "./Task";

export default interface ITaskRepository {

    add(todo: Task): Promise<Task>;

    complete(task: Task): Promise<Task>;

    delete(task: Task): Promise<Task>;

    findByUserAndId(userId: string, id_task: string): Task | null;

    update(task: Task): Promise<Task>;

    listAllByUserAndNotDeleted(userId: string): Promise<Task[]>;

}