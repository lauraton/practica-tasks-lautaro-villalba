import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";


export const createUser = async (req, res) => {
   try {
    const { name, email, password } = req.body;

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            message: "Los campos deben de ser completados con una cadena de texto"
        })
    }
    
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({
            message: "Los campos DEBEN ser completados."
        })
    }

    if (name.length > 100 || email.length > 100 || password.length > 100) {
        return res.status(400).json({
            message: "Los campos no deben sobrepasar los 100 caracteres"
        })
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ message: "Email ya registrado" })
    }

    
    const user = await User.create({
    name,
    email,
    password
});

return res.status(201).json({
    message: "Usuario creado correctamente",
    user
});
   } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error interno del servidor"})
   }}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: { model: Task, as: "tareas" }
        });

        return res.status(200).json(users);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};



export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            include: {
                model: Task, as: "tareas"
    }});

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};



export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Los campos deben de ser completados con una cadena de texto"
            });
        }

       
        if (
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            return res.status(400).json({
                message: "Los campos DEBEN ser completados."
            });
        }

       
        if (
            name.length > 100 ||
            email.length > 100 ||
            password.length > 100
        ) {
            return res.status(400).json({
                message: "Los campos no deben sobrepasar los 100 caracteres"
            });
        }

        
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser && existingUser.id !== user.id) {
            return res.status(400).json({
                message: "Email ya registrado"
            });
        }

        
        await user.update({
            name,
            email,
            password
        });

        return res.status(200).json({
            message: "Usuario actualizado correctamente",
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar usuario
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        
        await user.destroy();

        return res.status(200).json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};