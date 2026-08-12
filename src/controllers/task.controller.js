import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete } = req.body;

        if (
            typeof title !== "string" ||
            typeof description !== "string"
        ) {
            return res.status(400).json({
                message: "Title y description deben ser cadenas de texto"
            });
        }

        if (
            title.trim() === "" ||
            description.trim() === ""
        ) {
            return res.status(400).json({
                message: "Title y description no pueden estar vacíos"
            });
        }

        if (
            title.length > 100 ||
            description.length > 100
        ) {
            return res.status(400).json({
                message: "Title y description no deben superar los 100 caracteres"
            });
        }

        if (
            isComplete !== undefined &&
            typeof isComplete !== "boolean"
        ) {
            return res.status(400).json({
                message: "isComplete debe ser un valor booleano"
            });
        }

        const existingTask = await Task.findOne({
            where: { title }
        });

        if (existingTask) {
            return res.status(400).json({
                message: "El título de la tarea ya está registrado"
            });
        }

        const task = await Task.create({
            title,
            description,
            isComplete
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
        const tasks = await Task.findAll();

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

        const task = await Task.findByPk(id);

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
        const { title, description, isComplete } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        if (
            typeof title !== "string" ||
            typeof description !== "string"
        ) {
            return res.status(400).json({
                message: "Title y description deben ser cadenas de texto"
            });
        }

        if (
            title.trim() === "" ||
            description.trim() === ""
        ) {
            return res.status(400).json({
                message: "Title y description no pueden estar vacíos"
            });
        }

        if (
            title.length > 100 ||
            description.length > 100
        ) {
            return res.status(400).json({
                message: "Title y description no deben superar los 100 caracteres"
            });
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                message: "isComplete debe ser un valor booleano"
            });
        }

        const existingTask = await Task.findOne({
            where: { title }
        });

        if (existingTask && existingTask.id !== task.id) {
            return res.status(400).json({
                message: "El título de la tarea ya está registrado"
            });
        }

        await task.update({
            title,
            description,
            isComplete
        });

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