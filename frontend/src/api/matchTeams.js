const API_URL = import.meta.env.VITE_API_URL;

export async function getMatchTeams() {
   try {
     const response = await fetch(`http://localhost:3000/api/matchTeams`);
    if (!response.ok) {
        throw new Error("Failed to fetch matchTeams.");
    }
    return response.json();
   } catch (error) {
    console.error("Database not available.");
   }
}

export async function setMatchTeamSource(matchId, slot, teamId) {  
  try {
    const response = await fetch(
      `${API_URL}/matchTeams/${matchId}/${slot}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({teamId}),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch matches.");
    }

    return response.json();
  } catch (error) {
    console.error("Database not available.");
  }
}