import express from "express";
import {getTeams, getTeamById, getMatchesByTeam} from "../controllers/team.controller.js";

const router = express.Router();

router.get("/", getTeams);

router.get("/:id", getTeamById);

router.get("/:id/matches", getMatchesByTeam);

export default router;