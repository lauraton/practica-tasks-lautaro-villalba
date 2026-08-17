import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

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
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
})

Profile.belongsTo(User, {foreignKey: "user_id", as: "usuario"});

User.hasOne(Profile, {foreignKey: "user_id", as: "perfil"})