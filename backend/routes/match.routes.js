import express from "express";
import {getMatches, getMatchById, getTeamsByMatch, setMatchScore} from "../controllers/match.controller.js";

const router = express.Router();

router.get("/", getMatches);

router.get("/:id", getMatchById);

router.get("/:id/teams", getTeamsByMatch);

router.patch("/:id", setMatchScore);

export default router;