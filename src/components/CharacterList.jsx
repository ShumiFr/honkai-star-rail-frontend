/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { getCharacters } from "../api/characterApi";
import CharacterCard from "./CharacterCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faHandFist,
  faVirus,
  faFlask,
  faMedkit,
} from "@fortawesome/free-solid-svg-icons";

const CharacterList = ({ nickname }) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [combatTypes, setCombatTypes] = useState([]);
  const [selectedCombatType, setSelectedCombatType] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [obtainedFilter, setObtainedFilter] = useState("all");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        const updatedData = data.map((character) => ({
          ...character,
          name: character.name === "{NICKNAME}" ? nickname : character.name,
        }));
        updatedData.sort((a, b) => a.name.localeCompare(b.name)); // Trier par ordre alphabétique
        setCharacters(updatedData);
        setFilteredCharacters(updatedData);
        const types = Array.from(
          new Set(updatedData.map((char) => JSON.stringify(char.combatType)))
        ).map((type) => JSON.parse(type));
        setCombatTypes(types);
      } catch (error) {
        console.error("Erreur lors de la récupération des personnages:", error);
      }
    };

    fetchCharacters();
  }, [nickname]);

  useEffect(() => {
    filterCharacters();
  }, [selectedCombatType, selectedRole, obtainedFilter, characters]);

  const filterCharacters = () => {
    let filtered = characters;
    if (selectedCombatType !== "all") {
      filtered = characters.filter(
        (char) => char.combatType.id === selectedCombatType
      );
    }
    if (selectedRole !== "all") {
      filtered = filtered.filter((char) => char.role === selectedRole);
    }
    if (obtainedFilter !== "all") {
      const isObtained = obtainedFilter === "obtained";
      filtered = filtered.filter((char) => char.obtained === isObtained);
    }
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredCharacters(filtered);
  };

  return (
    <div>
      <div className="filters">
        <div className="element-filters">
          <button
            className={`element-choice ${
              selectedCombatType === "all" ? "active" : ""
            }`}
            onClick={() => setSelectedCombatType("all")}
          >
            <FontAwesomeIcon icon={faAsterisk} color="white" />
          </button>
          {combatTypes.map((type) => (
            <button
              key={type.id}
              className={`element-choice ${
                selectedCombatType === type.id ? "active" : ""
              }`}
              onClick={() => setSelectedCombatType(type.id)}
            >
              <img src={type.icon} alt={type.name} />
            </button>
          ))}
        </div>
        <div className="role-filters">
          <button
            className={`role-choice ${selectedRole === "all" ? "active" : ""}`}
            onClick={() => setSelectedRole("all")}
          >
            <FontAwesomeIcon icon={faAsterisk} color="white" />
          </button>
          <button
            className={`role-choice ${
              selectedRole === "DPS Principal" ? "active" : ""
            }`}
            onClick={() => setSelectedRole("DPS Principal")}
          >
            <FontAwesomeIcon icon={faHandFist} color="red" />
          </button>
          <button
            className={`role-choice ${
              selectedRole === "DPS Secondaire" ? "active" : ""
            }`}
            onClick={() => setSelectedRole("DPS Secondaire")}
          >
            <FontAwesomeIcon icon={faVirus} color="darkviolet" />
          </button>
          <button
            className={`role-choice ${
              selectedRole === "Soutien" ? "active" : ""
            }`}
            onClick={() => setSelectedRole("Soutien")}
          >
            <FontAwesomeIcon icon={faFlask} color="yellow" />
          </button>
          <button
            className={`role-choice ${
              selectedRole === "Support" ? "active" : ""
            }`}
            onClick={() => setSelectedRole("Support")}
          >
            <FontAwesomeIcon icon={faMedkit} color="green" />
          </button>
        </div>
        <div className="obtained-filters">
          <button
            className={`obtained-choice ${
              obtainedFilter === "all" ? "active" : ""
            }`}
            onClick={() => setObtainedFilter("all")}
          >
            Tous
          </button>
          <button
            className={`obtained-choice ${
              obtainedFilter === "obtained" ? "active" : ""
            }`}
            onClick={() => setObtainedFilter("obtained")}
          >
            Obtenu
          </button>
          <button
            className={`obtained-choice ${
              obtainedFilter === "notObtained" ? "active" : ""
            }`}
            onClick={() => setObtainedFilter("notObtained")}
          >
            Pas Obtenu
          </button>
        </div>
      </div>
      <div className="characters-grid">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            nickname={nickname}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
