const API_URL = import.meta.env.VITE_API_URL;

export async function getTeams() {
    try {
        const response = await fetch('http://localhost:3000/api/teams');
        if (!response.ok){
            throw new Error("Fail to fetch teams.")
        }
        return response.json();
    } catch (error) {        
        console.error("Database not available.")
    }
}
