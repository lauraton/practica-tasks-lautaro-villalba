import { User } from '../models/task.model';

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }
    } catch (error) {
        console.log("Error perrita")
    }
}