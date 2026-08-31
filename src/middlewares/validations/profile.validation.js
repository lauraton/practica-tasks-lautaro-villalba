import { body, param } from "express-validator";
import { Profile } from "../../models/profile.model.js"

export const createProfileValidation = [
    body("age")
        .notEmpty()
        .withMessage("El campo age no debe de estar vacío")
        .isInt()
        .withMessage("La entrada debe de ser un número real."),
    
    body("phone")
        .optional()
        .isInt()
        .withMessage("Phone debe tener números enteros.")
        .isLength( { max: 10})
        .withMessage("El número de teléfono no puede superar los 10 caracteres"),

    body("biography")
        .optional()
        .isLength( { max: 200 })
        .withMessage("La biografía no debe superar los 200 caracteres."),

    body("user_id")
        .notEmpty()
        .withMessage("El campo user_id NO puede estar vacío")
        .isInt()
        .withMessage("user_id debe ser un número entero")
        .custom(async (user_id) => {
            const existeId = await Profile.findByPk(user_id)

            if (existeId) {
                throw new Error("El user_id ya existe")
            }

            return true
        })
]

export const profileUpdateValidation = [
    body("age")
        .optional()
        .notEmpty()
        .withMessage("age no puede estar vacío")
        .isInt()
        .withMessage("age debe ser un número entero"),

    body("phone")
        .optional()
        .isInt()
        .withMessage("phone debe ser un número entero"),

    body("biography")
        .optional()
        .isLength( { max: 200 } )
        .withMessage("biography no puede superar los 200 caracteres"),

    body("user_id")
        .optional()
        .notEmpty()
        .withMessage("user_id no puede quedar vacío")
        .isInt()
        .withMessage("user_id debe ser un número real")
        .custom(async (user_id) => {
            const existeId = await Profile.findByPk(user_id)

            if (existeId) {
                throw new Error("El user_id ya tiene dueño")
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