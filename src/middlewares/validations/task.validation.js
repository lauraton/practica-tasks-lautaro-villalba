import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js"
import { User } from "../../models/user.model";

export const createTaskValidation = [
    body("title") 
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isString()
        .withMessage("El título debe de ser un string")
        .isLength( {max: 100})
        .withMessage("El título no puede superar los 100 carácteres")
        .custom(async (title) => {
            const existingTask = await Task.findOne({
                where: { title: title.trim() }});
            if (existingTask) {
                throw new Error("El título de la tarea ya está registrado");}
            return true;
        }),

    body("description")
        .notEmpty()
        .withMessage("La descripción no puede estar vacía")
        .isString()
        .withMessage("La descripción debe de ser un string")
        .isLength({max: 100})
        .withMessage("La descripción no puede superar los 100 caracteres"),

     body("is_completed")
        .optional()
        .isBoolean()
        .withMessage("is_completed debe ser un valor booleano"),

     body("user_id")
        .notEmpty()
        .withMessage("user_id es obligatorio")
        .isInt({ min: 1 })
        .withMessage("user_id debe ser un entero positivo")
        .custom(async (user_id) => {
            const user = await User.findByPk(user_id);
            if (!user) {
                throw new Error("El usuario no existe");
            }
            return true;
        })
];

export const updateTaskValidation = [
    body("title")
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isString()
        .withMessage("El título debe ser un texto")
        .isLength({ max: 100 })
        .withMessage("El título no puede superar los 100 caracteres")
        .custom(async (title, { req }) => {
            const existingTask = await Task.findOne({
                where: { title: title.trim() }
            });

            if (existingTask && existingTask.id !== Number(req.params.id)) {
                throw new Error("El título de la tarea ya está registrado");
            }

            return true;
        }),

    body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .isString()
        .withMessage("La descripción debe ser un texto")
        .isLength({ max: 100 })
        .withMessage("La descripción no puede superar los 100 caracteres"),

    body("is_completed")
        .isBoolean()
        .withMessage("is_completed debe ser un valor booleano")
];

export const taskIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
        .custom(async (id) => {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error("La tarea no existe");
            } return true;
        })
];