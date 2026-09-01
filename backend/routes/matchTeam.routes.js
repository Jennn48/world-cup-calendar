import express from "express";
import { getMatchTeams, setMatchTeamSource} from "../controllers/matchTeam.controller.js";

const router = express.Router();

router.get("/", getMatchTeams);

router.patch("/:id/:slot", setMatchTeamSource);

export default router;