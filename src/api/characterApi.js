import axios from "axios";

const API_URL = "https://honkai-star-rail-backend.onrender.com/api";

export const getCharacters = async () => {
  try {
    const response = await axios.get(`${API_URL}/characters`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des personnages:", error);
    throw error;
  }
};

export const getCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage:", error);
    throw error;
  }
};

export const getAllLightCones = async () => {
  try {
    const response = await axios.get(`${API_URL}/light-cones`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des cônes de lumière:",
      error
    );
    throw error;
  }
};

export const getAllRelics = async () => {
  try {
    const response = await axios.get(`${API_URL}/light-cones/relics`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des reliques:", error);
    throw error;
  }
};
