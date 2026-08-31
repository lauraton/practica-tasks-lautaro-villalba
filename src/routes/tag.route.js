import { Router } from "express";
import {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";
import { createTagValidation, tagIdValidation, updateTagValidation } from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validate.js";


export const tagRouter = Router();

tagRouter.get("/tags", getTags);
tagRouter.get("/tags/:id", getTagById);
tagRouter.post("/tags", createTagValidation, validate, createTag);
tagRouter.put("/tags/:id", tagIdValidation, updateTagValidation, validate, updateTag);
tagRouter.delete("/tags/:id", deleteTag);
