import express from "express";
import {getMatches, getMatchById, getTeamsByMatch} from "../controllers/match.controller.js";

const router = express.Router();

router.get("/", getMatches);

router.get("/:id", getMatchById);

router.get("/:id/teams", getTeamsByMatch);

export default router;