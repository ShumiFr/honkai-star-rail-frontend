/* eslint-disable react/prop-types */
const CharacterHeader = ({ character, elementColor }) => {
  return (
    <div className="character-detail-header">
      <h1 style={{ color: elementColor }}>{character.name}</h1>
      <div className="character-detail-image">
        <img src={character.splashImage} alt={character.name} />
      </div>
      <div className="character-detail-path">
        <h2 style={{ color: elementColor }}> Voie : {character.path.name}</h2>
      </div>
    </div>
  );
};

export default CharacterHeader;
