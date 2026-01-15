import { Router } from 'express'
import TaskController from '../controllers/TaskController';
import TaskService from '../services/TaskService';
import TaskRepository from '../repositories/inMemory/TaskRepository';
import { validateBody } from '../middlewares/validate';
import { CreateTaskSchema, UpdateTaskShema } from '../schemas/TaskSchema';
import { authenticate } from '../middlewares/authenticate';

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

const taskRoutes = Router()

taskRoutes.post('/task', validateBody(CreateTaskSchema), authenticate(), taskController.add)
taskRoutes.put('/task/:id_task/complete', authenticate(), taskController.complete)
taskRoutes.put('/task/:id_task/delete', authenticate(), taskController.delete)
taskRoutes.put('/task/:id_task', validateBody(UpdateTaskShema), authenticate(), taskController.update)

taskRoutes.get('/tasks', authenticate(), taskController.listAll)

export default taskRoutes;