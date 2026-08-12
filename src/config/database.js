import { Sequelize } from 'sequelize';

// Conexión a la base de datos MySQL
// lo del 'new' hace referencia a crear una nueva instancia, usando a Sequelize luego como base o plantilla
export const sequelize = new Sequelize('tasks_users_db', 'root', '', {
// lo de task_user_db es el nombre de la bd. root es el usuario y lo vacío la contraseña
  host: 'localhost',
//   habla de q se ejecuta en lo local
  dialect: 'mysql',
//   el lenguaje q entiende
    logging: false,
});

export const startDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("La base de datos está lista")
        
    } catch (error) {
        console.log("No se pudo conectar a la base de datos:", error);
        
    }
}

