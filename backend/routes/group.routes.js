import express from "express";
import {getGroups, getGroupById, getTeamsByGroup} from "../controllers/group.controller.js";

const router = express.Router();

router.get("/", getGroups);

router.get("/:id", getGroupById);

router.get("/:id/teams", getTeamsByGroup);

export default router;