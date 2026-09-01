import express from "express";
import {getTournaments, getTournamentById, resetTournament, setRealTournament} from "../controllers/tournament.controller.js";

const router = express.Router();

router.get("/", getTournaments);

router.get("/:id", getTournamentById);

router.post("/", resetTournament);

router.post("/real", setRealTournament);

export default router;