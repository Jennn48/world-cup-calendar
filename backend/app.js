import express from "express";
import db from "./db/db.js";
import tournamentRoutes from "./routes/tournament.routes.js";
import teamRoutes from "./routes/team.routes.js";
import groupRoutes from "./routes/group.routes.js";
import matchRoutes from "./routes/match.routes.js";
import matchTeamRoutes from "./routes/matchTeam.routes.js";
import cors from "cors";

const app = express();
const PORT = 3000;
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    let response;
  try {
    response = await db.query("SELECT * FROM team WHERE id=$1", [24]);
  } catch (error){
    console.error(error);

    res.status(500).json({
      error: "Error retrieving teams",
    });
  }
  res.json({ message: response.rows });
});

app.use("/api/tournament", tournamentRoutes);

app.use("/api/teams", teamRoutes);

app.use("/api/groups", groupRoutes);

app.use("/api/matches", matchRoutes);

app.use("/api/matchTeams", matchTeamRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
