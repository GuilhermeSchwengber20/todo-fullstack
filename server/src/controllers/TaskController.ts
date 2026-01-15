import TaskService from "../services/TaskService";
import { Request, Response } from "express";

class TaskController {

    constructor(private readonly taskService: TaskService) {}

    add = async (req: Request, res: Response) => {
        const { title, description } = req.body;
        const userId = (req as any).user.id;
        
        try {
            const data = await this.taskService.add({ title, description, userId });

            res.status(201).json(data);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Algo deu errado!" });
        }
    }

    complete = async (req: Request, res: Response) => {
        const { id_task } = req.params;
        const userId = (req as any).user.id;

        try {
            const data = await this.taskService.complete({ id_task: Array.isArray(id_task) ? id_task[0] : id_task, userId });

            res.status(200).json(data);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        const { id_task } = req.params;
        console.log(req.params)
        const userId = (req as any).user.id;

        try {
            const data = await this.taskService.delete({ id_task: Array.isArray(id_task) ? id_task[0] : id_task, userId });

            res.status(200).json(data);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        const { id_task } = req.params;
        const userId = (req as any).user.id;
        const { title, description } = req.body;

        try {
            const data = await this.taskService.update({userId, id_task: Array.isArray(id_task) ? id_task[0] : id_task, title, description });
            res.status(200).json(data);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    listAll = async (req: Request, res: Response) => {

        const userId = (req as any).user.id;
        try {
            const data = await this.taskService.listAll(userId);

            res.status(200).json(data);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}


export default TaskController