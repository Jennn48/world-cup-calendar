const API_URL = import.meta.env.VITE_API_URL;

export async function getMatches() {
    try {
        const response = await fetch(`http://localhost:3000/api/matches`);
        if(!response.ok){
            throw new Error("Failed to fetch matches.")
        }
        return response.json();
    } catch (error) {
        console.error("Database not available.")        
    }
}

export async function getTeamsByMatch(matchId) {
    try {        
        const response = await fetch(`http://localhost:3000/api/matches/${matchId}/teams`);
        if(!response.ok){
            throw new Error("Failed to fetch matches.")
        }
        return response.json();
    } catch (error) {
        console.error("Database not available.")        
    }
}