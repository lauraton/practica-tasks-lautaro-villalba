import { DataTypes } from 'sequelize';
import { Sequelize } from '../config/database.js';

export const user = sequelize.define('User', {

    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,

    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }



}

)