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