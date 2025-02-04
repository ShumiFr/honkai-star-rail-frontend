import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (uid) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { uid });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error);
    throw error;
  }
};

export const getUser = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/users/${uid}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    throw error;
  }
};

export const updateUser = async (uid, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${uid}`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
};

export const addLightCone = async (uid, characterId, lightConeData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/${uid}/characters/${characterId}/light-cones`,
      lightConeData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du cône de lumière:", error);
    throw error;
  }
};

export const updateLightCone = async (
  uid,
  characterId,
  lightConeId,
  lightConeData
) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${uid}/characters/${characterId}/light-cones/${lightConeId}`,
      lightConeData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du cône de lumière:", error);
    throw error;
  }
};

export const addRelic = async (uid, characterId, relicData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/${uid}/characters/${characterId}/relics`,
      relicData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la relique:", error);
    throw error;
  }
};

export const updateRelic = async (uid, characterId, relicId, relicData) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${uid}/characters/${characterId}/relics/${relicId}`,
      relicData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la relique:", error);
    throw error;
  }
};

export const removeRelic = async (uid, characterId, relicId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/${uid}/characters/${characterId}/relics/${relicId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la relique:", error);
    throw error;
  }
};

export const updateCharacterProgress = async (
  uid,
  characterId,
  progressData
) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${uid}/characters/${characterId}/progress`,
      progressData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la progression du personnage:",
      error
    );
    throw error;
  }
};
