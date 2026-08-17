import { Tag } from "../models/tag.model.js";
import { Task } from "../models/task.model.js";


export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Task,
                    as: 'tasks',
                    attributes: ['id', 'title', 'description', 'status'], // Solo atributos esenciales
                    through: { attributes: [] } // Oculta los datos de la tabla intermedia
                }
            ]
        });

        return res.status(200).json({
            message: "Etiquetas obtenidas con éxito",
            data: tags
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las etiquetas",
            error: error.message
        });
    }
};


export const getTagById = async (req, res) => {
    const { id } = req.params;

    try {
        const tag = await Tag.findByPk(id, {
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Task,
                    as: 'tasks',
                    attributes: ['id', 'title', 'description', 'status'],
                    through: { attributes: [] }
                }
            ]
        });

        if (!tag) {
            return res.status(404).json({
                message: `No se encontró la etiqueta con el ID: ${id}`
            });
        }

        return res.status(200).json({
            message: "Etiqueta obtenida con éxito",
            data: tag
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la etiqueta",
            error: error.message
        });
    }
};


export const createTag = async (req, res) => {
    const { name } = req.body;

    try {
        // Validación de campo requerido
        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "El nombre de la etiqueta es obligatorio"
            });
        }

       
        const existingTag = await Tag.findOne({ where: { name: name.trim() } });
        if (existingTag) {
            return res.status(400).json({
                message: "Ya existe una etiqueta con ese nombre"
            });
        }

        const newTag = await Tag.create({ name: name.trim() });

        return res.status(201).json({
            message: "Etiqueta creada exitosamente",
            data: newTag
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear la etiqueta",
            error: error.message
        });
    }
};

export const updateTag = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
       
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({
                message: `No se encontró la etiqueta con el ID: ${id}`
            });
        }

        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "El nombre de la etiqueta es obligatorio"
            });
        }

        
        const existingTag = await Tag.findOne({ where: { name: name.trim() } });
        if (existingTag && existingTag.id !== parseInt(id)) {
            return res.status(400).json({
                message: "Ya existe otra etiqueta con ese nombre"
            });
        }

        await tag.update({ name: name.trim() });

        return res.status(200).json({
            message: "Etiqueta actualizada exitosamente",
            data: tag
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la etiqueta",
            error: error.message
        });
    }
};


export const deleteTag = async (req, res) => {
    const { id } = req.params;

    try {
        
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({
                message: `No se encontró la etiqueta con el ID: ${id}`
            });
        }

        await tag.destroy();

        return res.status(200).json({
            message: "Etiqueta eliminada correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la etiqueta",
            error: error.message
        });
    }
};