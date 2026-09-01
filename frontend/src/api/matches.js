const API_URL = import.meta.env.VITE_API_URL;

export async function getMatches() {
  try {
    const response = await fetch(`${API_URL}/matches`);
    if (!response.ok) {
      throw new Error("Failed to fetch matches.");
    }
    return response.json();
  } catch (error) {
    console.error("Database not available.");
  }
}

export async function getTeamsByMatch(matchId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/matches/${matchId}/teams`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch matches.");
    }
    return response.json();
  } catch (error) {
    console.error("Database not available.");
  }
}

export async function setMatchScore(matchId, data) {  
  try {
    const response = await fetch(
      `http://localhost:3000/api/matches/${matchId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
