import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Profile = sequelize.define('Profile', {
    age: {
        type: DataTypes.INTEGER(2),
        allowNull: false
    },

    phone: {
        type: DataTypes.REAL(16),
        allowNull: true
    },

    biography: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
})