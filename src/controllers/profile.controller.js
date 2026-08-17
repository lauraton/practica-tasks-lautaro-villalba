import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

export const createProfile = async (req, res) => {
    try {
        const { age, phone, biography, user_id } = req.body;

        if (!Number.isInteger(age)) {
            return res.status(400).json({
                message: "Age debe ser un número entero"
            });
        }

        if (phone !== undefined && phone !== null && typeof phone !== "number") {
            return res.status(400).json({
                message: "Phone debe ser un número"
            });
        }

        if (biography !== undefined && biography !== null && typeof biography !== "string") {
            return res.status(400).json({
                message: "Biography debe ser una cadena de texto"
            });
        }

        if (biography && biography.length > 200) {
            return res.status(400).json({
                message: "Biography no debe superar los 200 caracteres"
            });
        }

        if (!Number.isInteger(user_id)) {
            return res.status(400).json({
                message: "user_id debe ser un número entero"
            });
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({
                message: "El usuario no existe"
            });
        }

        const existingProfile = await Profile.findOne({
            where: { user_id }
        });

        if (existingProfile) {
            return res.status(400).json({
                message: "El usuario ya tiene un perfil"
            });
        }

        const profile = await Profile.create({
            age,
            phone,
            biography,
            user_id
        });

        return res.status(201).json({
            message: "Perfil creado correctamente",
            profile
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll({
            include: {
                model: User,
                as: "usuario",
                attributes: ["id", "name", "email"]
            }
        });

        return res.status(200).json(profiles);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};