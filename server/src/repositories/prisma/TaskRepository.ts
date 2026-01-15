import ITaskRepository from "../../models/ITaskRepository";
import prisma from "../../db/prisma";
import { Task } from "../../models/Task";


class TaskRepository implements ITaskRepository {

    async add(task: Task): Promise<Task> {
        const createdTask = await prisma.task.create({
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                userId: task.userId,
                completed: task.completed,
                deletedAt: task.deletedAt
            }
        })

        return createdTask;
    }

    async complete(task: Task): Promise<Task> {
        const completedTask = await prisma.task.update({
            where: { id: task.id, userId: task.userId },
            data: { completed: true }
        });
        return completedTask;
    }

    async delete(task: Task): Promise<Task> {
        const deletedTask = await prisma.task.update({
            where: { id: task.id, userId: task.userId },
            data: { deletedAt: new Date() }
        });
        return deletedTask;
    }

    async update(task: Task): Promise<Task> {
        const updatedTask = await prisma.task.update({
            where: { id: task.id, userId: task.userId },
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                userId: task.userId,
                completed: task.completed,
                deletedAt: task.deletedAt
            }
        })

        return updatedTask
    }

    async findByUserAndId(userId: string, id: string): Promise<Task | null> {
        const task = await prisma.task.findFirst({
            where: {
                id,
                userId,
                deletedAt: null
            }
        });
        return task;
    }

    async listAllByUserAndNotDeleted(userId: string): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            where: {
                userId,
                deletedAt: null
            }
        })

        return tasks;
    }
}


export default TaskRepository