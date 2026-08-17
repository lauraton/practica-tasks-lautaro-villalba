import { Router } from "express";
import express from "express";
import {
    createProfile,
    getProfiles
} from "../controllers/profile.controller.js";

export const profileRouter = express.Router();

profileRouter.post("/profiles", createProfile);
profileRouter.get("/profiles", getProfiles);