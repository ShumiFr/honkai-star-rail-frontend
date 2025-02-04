/* eslint-disable react/prop-types */

const TeamList = ({ teams }) => {
  return (
    <div>
      <h2>Liste des Équipes</h2>
      {teams.length === 0 ? (
        <p>Aucune équipe créée.</p>
      ) : (
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              <h3>{team.name}</h3>
              <p>Membres:</p>
              <ul>
                {team.characters.map((character, charIndex) => (
                  <li key={charIndex}>{character.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamList;
