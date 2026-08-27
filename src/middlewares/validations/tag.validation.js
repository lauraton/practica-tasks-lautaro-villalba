import { body, param } from "express-validator"
import { Tag } from "../../models/task.model.js"

export const createTagValidation = [
    body("name")
        .notEmpty()
        .withMessage("El name no puede quedar vacío")
        .isString()
        .withMessage("El name debe de ser un string")
        .isLength( { max: 100 })
        .withMessage("El nombre no puede superar los 100 caracteres")
        .custom(async (name) => {
            const existeTag = await Tag.findOne({
                where: { name: name }
            })

            if (existeTag) {
                throw new Error("Ya existe esa etiqueta en la base de datos.")
            }
            return true
        })
]

export const tagIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
        .custom(async (id) => {
            const user = await Tag.findByPk(id);

            if (!user) {
                throw new Error("La etiqueta no existe");
            }
            return true;
        })
];