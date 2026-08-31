import { Router } from "express";

import {
    createProfile,
    deleteProfile,
    getProfiles,
    updateProfiles
} from "../controllers/profile.controller.js";
import { createProfileValidation, profileIdValidation, profileUpdateValidation } from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";

export const profileRouter = Router();

profileRouter.post("/profiles", createProfileValidation, validate, createProfile);
profileRouter.get("/profiles", getProfiles);
profileRouter.put("/profiles/:id", profileIdValidation, profileUpdateValidation, validate, updateProfiles);
profileRouter.delete("/profiles/:id", profileIdValidation, deleteProfile);