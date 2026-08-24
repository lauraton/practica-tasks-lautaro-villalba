import { Router } from 'express';

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";
import { createTaskValidation, taskIdValidation, updateTaskValidation } from '../middlewares/validations/task.validation.js';
import { validate } from '../middlewares/validate.js';
export const taskRouter = Router();


taskRouter.post("/tasks", createTaskValidation, validate, createTask);
taskRouter.get("/tasks", getTasks);
taskRouter.get("/tasks/:id", taskIdValidation, validate, getTaskById);
taskRouter.put("/tasks/:id", taskIdValidation, updateTaskValidation, validate, updateTask);
taskRouter.delete("/tasks/:id", taskIdValidation, validate, deleteTask);