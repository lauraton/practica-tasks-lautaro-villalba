import { Router } from "express";
import {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

export const tagRouter = Router();

tagRouter.get("/tags", getTags);
tagRouter.get("/tags/:id", getTagById);
tagRouter.post("/tags", createTag);
tagRouter.put("/tags/:id", updateTag);
tagRouter.delete("/tags/:id", deleteTag);
