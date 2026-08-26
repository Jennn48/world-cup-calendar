import express from "express";
import { getMatchTeams } from "../controllers/matchTeam.controller.js";

const router = express.Router();

router.get("/", getMatchTeams);

export default router;