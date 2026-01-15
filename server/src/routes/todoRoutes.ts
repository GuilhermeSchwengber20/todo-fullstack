import { Router } from 'express'
import TodoController from '../controllers/TodoController';
import TodoService from '../services/TodoService';
import TodoRepository from '../repositories/inMemory/TodoRepository';
import { validateBody } from '../middlewares/validate';
import { CreateTodoSchema } from '../schemas/TodoSchema';

const todoRepository = new TodoRepository()
const todoService = new TodoService(todoRepository)
const todoController = new TodoController(todoService)

const todoRoutes = Router()

todoRoutes.post('/to-do', validateBody(CreateTodoSchema), todoController.add)


export default todoRoutes;