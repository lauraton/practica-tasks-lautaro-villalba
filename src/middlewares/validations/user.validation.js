import { body, param } from "express-validator";
import { User } from "../../models/user.model.js";

export const createUserValidation = [
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede superar los 100 caracteres"),

    body("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("El email debe tener un formato válido")
        .isLength({ max: 100 })
        .withMessage("El email no puede superar los 100 caracteres")
        .custom(async (email) => {
            const existingUser = await User.findOne({
                where: { email }
            });

            if (existingUser) {
                throw new Error("El email ya está registrado");
            }

            return true;
        }),

    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isLength({ min: 8, max: 100 })
        .withMessage("La contraseña debe tener entre 8 y 100 caracteres")
];

export const updateUserValidation = [
  param("id")
    .isLength({ max: 5 })
    .withMessage("El id no debe ser mayor a 5 caracteres"),
  body("name").optional().notEmpty().withMessage("El name no debe ser vacio"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("El email no debe ser vacio")
    .isEmail()
    .withMessage("El email debe ser valido")
    .custom(async (email) => {
            const existingUser = await User.findOne({
                where: { email }
            });

            if (existingUser) {
                throw new Error("El email ya está registrado");
            }

            return true;
        }),
];


export const userIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo")
        .custom(async (id) => {
            const user = await User.findByPk(id);

            if (!user) {
                throw new Error("El usuario no existe");
            }

            return true;
        })
];