import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"

export const Tag = sequelize.define("tag", {
    name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    }
});