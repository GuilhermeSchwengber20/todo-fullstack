import { Router } from 'express'
import TaskController from '../controllers/TaskController';
import TaskService from '../services/TaskService';
import TaskRepository from '../repositories/inMemory/TaskRepository';
import { validateBody } from '../middlewares/validate';
import { CreateTaskSchema } from '../schemas/TaskSchema';
import { authenticate } from '../middlewares/authenticate';

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

const taskRoutes = Router()

taskRoutes.post('/task', validateBody(CreateTaskSchema), authenticate(), taskController.add)


export default taskRoutes;