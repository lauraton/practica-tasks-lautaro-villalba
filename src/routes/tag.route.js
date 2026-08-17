import { Router } from "express";
import {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

export const tagRouter = Router();

tagRouter.get("/", getTags);
tagRouter.get("/:id", getTagById);
tagRouter.post("/", createTag);
tagRouter.put("/:id", updateTag);
tagRouter.delete("/:id", deleteTag);
