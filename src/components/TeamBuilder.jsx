/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getCharacters } from "../api/characterApi";
import { saveTeam } from "../api/teamApi";
import CharacterGrid from "./CharacterGrid";
import SelectedCharacters from "./SelectedCharacters";
import notFoundImage from "../assets/not-found.png"; // Assurez-vous que ce chemin est correct

const TeamBuilder = ({ uid }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        const updatedData = data.map((character) => ({
          ...character,
          name: character.name === "{NICKNAME}" ? "Pionnier" : character.name,
          icon: character.icon || notFoundImage, // Remplacer les images manquantes
        }));
        updatedData.sort((a, b) => a.name.localeCompare(b.name)); // Trier par ordre alphabétique
        setCharacters(updatedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des personnages:", error);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacterSelect = (character) => {
    if (
      selectedCharacters.length < 4 &&
      !selectedCharacters.includes(character)
    ) {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const handleCharacterRemove = (character) => {
    setSelectedCharacters(selectedCharacters.filter((c) => c !== character));
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSaveTeam = async () => {
    if (selectedCharacters.length === 4 && teamName) {
      try {
        console.log("Tentative de sauvegarde de l'équipe:", {
          name: teamName,
          characters: selectedCharacters.map((character) => ({
            name: character.name,
            icon: character.icon,
            role: character.role,
          })),
        });
        const response = await saveTeam(uid, {
          name: teamName,
          characters: selectedCharacters.map((character) => ({
            name: character.name,
            icon: character.icon,
            role: character.role,
          })),
        });
        console.log("Réponse du serveur après sauvegarde:", response);
        alert("Équipe sauvegardée avec succès !");
        setSelectedCharacters([]);
        setTeamName("");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'équipe:", error);
        alert("Une erreur est survenue lors de la sauvegarde de l'équipe.");
      }
    } else {
      alert("Veuillez sélectionner 4 personnages et donner un nom à l'équipe.");
    }
  };

  const roles = ["DPS Principal", "DPS Secondaire", "Soutien", "Support"];
  const charactersByRole = roles.reduce((acc, role) => {
    acc[role] = characters.filter(
      (character) =>
        character.role === role &&
        !selectedCharacters.some((selected) => selected.id === character.id)
    );
    return acc;
  }, {});

  return (
    <div className="team-builder">
      <h1>Constructeur d&apos;Équipe</h1>
      <input
        type="text"
        placeholder="Nom de l'équipe"
        value={teamName}
        onChange={handleTeamNameChange}
        className="team-name-input"
      />
      <SelectedCharacters
        selectedCharacters={selectedCharacters}
        handleCharacterRemove={handleCharacterRemove}
      />
      <button
        className="save-team-button"
        onClick={handleSaveTeam}
        disabled={selectedCharacters.length !== 4}
      >
        Sauvegarder l&apos;équipe
      </button>
      {roles.map((role) => (
        <div className="team-builder-role-container" key={role}>
          <h2>{role}</h2>
          <CharacterGrid
            characters={charactersByRole[role]}
            onCharacterSelect={handleCharacterSelect}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamBuilder;
