import { Routes } from 'express';

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

export const taskRouter = express.Router();


taskRouter.post("/tasks", createTask);
taskRouter.get("/tasks", getTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);