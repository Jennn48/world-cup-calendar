const API_URL = import.meta.env.VITE_API_URL;

export async function getGroups() {
   try {
     const response = await fetch(`${API_URL}/api/groups`);
    if (!response.ok) {
        throw new Error("Failed to fetch groups.");
    }
    return response.json();
   } catch (error) {
    console.error("Database not available.");
   }
}