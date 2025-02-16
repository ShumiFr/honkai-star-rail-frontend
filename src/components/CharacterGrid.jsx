/* eslint-disable react/prop-types */
import notFoundImage from "../assets/not-found.png"; // Importer l'image not-found

const CharacterGrid = ({ characters, onCharacterSelect }) => {
  return (
    <div className="character-grid">
      {characters.map((character) => (
        <div
          key={character.id}
          className={"team-builder-character-card"}
          onClick={() => onCharacterSelect(character)}
        >
          <div className="combat-type-icon">
            <img
              className="combat-type-icon-image"
              src={character.combatType.icon}
              alt={character.combatType.name}
            />
          </div>
          <div
            className={`team-builder-character-icon ${
              character.stars === 5 ? "five-stars" : "four-stars"
            }`}
          >
            <img
              className="character-icon-image"
              src={character.icon || notFoundImage}
              alt="❓"
            />
          </div>
          <div className="team-builder-character-name">
            <h3>
              {character.name === "{NICKNAME}" ? "Pionnier" : character.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterGrid;
