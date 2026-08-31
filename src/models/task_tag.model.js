import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"
import { Task } from "./task.model.js"
import { Tag } from "./tag.model.js"

export const Task_Tag = sequelize.define("task_tag", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
})

Task.belongsToMany(Tag, { through: Task_Tag, foreignKey: "task_id", otherKey: "tag_id" as: "tarea"})

Tag.belongsToMany(Task, { through: Task_Tag, foreignKey: "tag_id", otherKey: "task_id" as: "etiquetas"})