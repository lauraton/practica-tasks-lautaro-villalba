import { body, param } from "express-validator";
import { Profile } from "../../models/profile.model.js"

export const createProfile = [
    body("age")
        .notEmpty()
        .withMessage("El campo age no debe de estar vacío")
        .isInt()
        .withMessage("La entrada debe de ser un número real."),
    
    body("phone")
        .optional()
        .isLength( { max: 10})
        .withMessage("El número de teléfono no puede superar los 10 caracteres"),

    body("biography")
        .optional()
        .isString()
        .withMessage("La biografía debe de ser un string"),

    body("user_id")
        .notEmpty()
        .withMessage("El campo user_id NO puede estar vacío")
        .custom(async (user_id) => {
            const existeId = Profile.findByPk(user_id)

            if (existeId) {
                throw new Error("El user_id ya existe")
            }

            return true
        })
]

export const profileIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
        .custom(async (id) => {
            const profile = await Profile.findByPk(id);

            if (!profile) {
                throw new Error("El profile no existe");
            }
            return true;
        })
];