/* eslint-disable react/prop-types */
import notFoundImage from "../assets/not-found.png"; // Importer l'image not-found

const roleClasses = {
  "DPS Principal": "dps-principal",
  "DPS Secondaire": "dps-secondaire",
  Soutien: "soutien",
  Support: "support",
};

const SelectedCharacters = ({
  selectedCharacters,
  handleCharacterRemove,
  nickname,
}) => {
  const roles = ["DPS Principal", "DPS Secondaire", "Soutien", "Support"];

  return (
    <div className="selected-characters">
      {roles.map((role, index) => {
        const character = selectedCharacters[index];
        const displayRole = character ? character.role : role;
        const roleClass = character
          ? roleClasses[character.role]
          : roleClasses[role];

        return (
          <div
            key={index}
            className={`selected-character-container ${roleClass}`}
          >
            <div className="selected-character-role">{displayRole}</div>
            <div
              className="selected-character"
              onClick={() => character && handleCharacterRemove(character)}
            >
              {character ? (
                <>
                  <div className="combat-type-icon">
                    <img
                      src={character.combatType.icon}
                      alt={character.combatType.name}
                    />
                  </div>
                  <img
                    src={character.icon || notFoundImage}
                    alt={character.name}
                  />
                </>
              ) : (
                <div className="empty-slot">Vide</div>
              )}
            </div>
            {character && (
              <div className="selected-character-name">
                {character.name === "{NICKNAME}" ? nickname : character.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SelectedCharacters;
