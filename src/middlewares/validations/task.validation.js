import { body, param } from "express-validator";
import { Task } from "../../models/task.model.js"

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