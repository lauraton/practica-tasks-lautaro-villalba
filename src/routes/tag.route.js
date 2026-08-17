import { Router } from "express";
import {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

export const tagRouter = Router();

router.get("/", getTags);
router.get("/:id", getTagById);
router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;