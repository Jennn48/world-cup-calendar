const API_URL = import.meta.env.VITE_API_URL;

export async function resetTournament() {
  try {
    const response = await fetch(`${API_URL}/api/tournament`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to reset tournament.");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to reset the scores.");
  }
}

export async function setRealTournament() {
  try {
    const response = await fetch(
      `${API_URL}/api/tournament/real`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to set real tournament.");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to set real tournament.");
  }
}