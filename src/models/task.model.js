import { sequelize } from "../config/database.js";
import { DataTypes, UniqueConstraintError } from "sequelize";

export const Task = sequelize.define("task", {
    title: {
        type: DataTypes.STRING,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})