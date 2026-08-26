import express from "express";
import db from "./db/db.js";
import teamRoutes from "./routes/teams.routes.js";

const app = express();
const PORT = 3000;
db.connect();

app.use(express.urlencoded({ extended: true }));

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

app.use("/api/teams", teamRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
