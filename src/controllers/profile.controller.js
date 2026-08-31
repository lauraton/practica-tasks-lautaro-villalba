import { matchedData } from "express-validator";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

export const createProfile = async (req, res) => {
    try {
        const { age, phone, biography, user_id } = req.body;


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

export const updateProfiles = async (req, res) => {
    try {
        const { id } = req.params
        const data = matchedData(req)
        const profile = await Profile.findByPk(id);

        if (!profile) {
            return res.status(404).json({
                message: "Profile inexistente"
            });
        }

        await profile.update(data);
        return res.status(200).json({
            message: "Profile actualizado correctamente",
            profile
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const profile = await Profile.findByPk(id);
        if (!profile) {
            return res.status(404).json({
                message: "Profile no encontrado"
            })
        }

        await profile.destroy();

        return res.status(200).json({
            message: "Profile eliminado correctamente"
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}