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
}


export default TaskController