
import { Router } from "express";

import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
import { createUserValidation, userIdValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";

export const userRouter = Router();

userRouter.post("/users", createUserValidation, validate, createUser);
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", userIdValidation, validate, getUserById);
userRouter.put("/users/:id", userIdValidation, validate, updateUser);
userRouter.delete("/users/:id", userIdValidation, validate, deleteUser);