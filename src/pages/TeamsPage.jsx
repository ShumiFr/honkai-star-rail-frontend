/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getTeams, deleteTeam } from "../api/teamApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandFist,
  faVirus,
  faFlask,
  faMedkit,
} from "@fortawesome/free-solid-svg-icons";

const roleIcons = {
  "DPS Principal": faHandFist,
  "DPS Secondaire": faVirus,
  Soutien: faFlask,
  Support: faMedkit,
};

const roleClasses = {
  "DPS Principal": "dps-principal",
  "DPS Secondaire": "dps-secondaire",
  Soutien: "soutien",
  Support: "support",
};

const TeamsPage = ({ uid }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log(`Fetching teams for user ID: ${uid}`);
        const teamsData = await getTeams(uid);
        setTeams(teamsData);
        console.log(`Teams for user ID ${uid}:`, teamsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des équipes:", error);
      }
    };

    fetchTeams();
  }, [uid]);

  const handleDeleteTeam = async (teamId) => {
    try {
      await deleteTeam(uid, teamId);
      setTeams(teams.filter((team) => team._id !== teamId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipe:", error);
    }
  };

  return (
    <div className="teams-page">
      <h1>Mes Équipes</h1>
      {teams.length === 0 ? (
        <p>Aucune équipe créée.</p>
      ) : (
        <div className="teams-list">
          {teams.map((team) => (
            <div key={team._id} className="team-card">
              <h3 className="team-name">{team.name}</h3>
              <div className="team-characters">
                {team.characters.map((character, index) => (
                  <div key={index} className="team-character">
                    <div
                      className={`team-character-role-icon ${
                        roleClasses[character.role]
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={roleIcons[character.role]}
                        color="white"
                      />
                    </div>
                    <img src={character.icon} alt={character.name} />
                    <div className="team-character-name">{character.name}</div>
                  </div>
                ))}
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteTeam(team._id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
