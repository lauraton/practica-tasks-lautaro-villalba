import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

export const Task = sequelize.define("task", {
    title: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
}

});

Task.belongsTo(User, { foreignKey: "user_id", as: "usuario" })

User.hasMany(Task, { foreignKey: "user_id", as: "tareas" })