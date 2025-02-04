import axios from "axios";

const API_URL = "https://honkai-star-rail-backend.onrender.com/api";

export const saveTeam = async (uid, teamData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/${uid}/teams`,
      teamData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'équipe:", error);
    throw error;
  }
};

export const getTeams = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/users/${uid}/teams`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des équipes:", error);
    throw error;
  }
};

export const deleteTeam = async (uid, teamId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/${uid}/teams/${teamId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipe:", error);
    throw error;
  }
};
