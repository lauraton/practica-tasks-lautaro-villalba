import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { matchedData } from "express-validator";


export const createTask = async (req, res) => {
    try {
        const { title, description, is_completed, user_id } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({
                message: "El usuario no existe"
            });
        }

        const task = await Task.create({
            title,
            description,
            is_completed,
            user_id
        });

        return res.status(201).json({
            message: "Tarea creada correctamente",
            task
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: {
                model: User, as: "usuario", attributes: ["id", "name", "email"]
            }
        });

        return res.status(200).json(tasks);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id, {
            include: {
                model: User, as: "usuario", attributes: ["id", "name", "email"]
            }
        });

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        return res.status(200).json(task);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const data = matchedData(req)
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }


        await task.update(data);

        return res.status(200).json({
            message: "Tarea actualizada correctamente",
            task
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        await task.destroy();

        return res.status(200).json({
            message: "Tarea eliminada correctamente"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};