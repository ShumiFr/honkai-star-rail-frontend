import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRail from "starral.js"; // Assurez-vous que ce package est installé

const CharacterDetails = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [obtained, setObtained] = useState(false);
  const [lightCone, setLightCone] = useState("");
  const [relics, setRelics] = useState({ head: "", body: "", feet: "" });
  const [ornaments, setOrnaments] = useState({ sphere: "", cord: "" });

  useEffect(() => {
    const fetchCharacter = async () => {
      const data = await StarRail.getCharacter(characterId);
      setCharacter(data);
    };
    fetchCharacter();
  }, [characterId]);

  const handleObtainedToggle = () => {
    setObtained(!obtained);
  };

  const handleLightConeChange = (e) => {
    setLightCone(e.target.value);
  };

  const handleRelicChange = (e) => {
    setRelics({ ...relics, [e.target.name]: e.target.value });
  };

  const handleOrnamentChange = (e) => {
    setOrnaments({ ...ornaments, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {character && (
        <>
          <h1>{character.name}</h1>
          <button onClick={handleObtainedToggle}>
            {obtained
              ? "Retirer des personnages obtenus"
              : "Ajouter aux personnages obtenus"}
          </button>
          <div>
            <h2>Équipement</h2>
            <div>
              <label>
                Cone de lumière:
                <input
                  type="text"
                  value={lightCone}
                  onChange={handleLightConeChange}
                />
              </label>
            </div>
            <div>
              <h3>Reliques</h3>
              <label>
                Tête:
                <input
                  type="text"
                  name="head"
                  value={relics.head}
                  onChange={handleRelicChange}
                />
              </label>
              <label>
                Corps:
                <input
                  type="text"
                  name="body"
                  value={relics.body}
                  onChange={handleRelicChange}
                />
              </label>
              <label>
                Pieds:
                <input
                  type="text"
                  name="feet"
                  value={relics.feet}
                  onChange={handleRelicChange}
                />
              </label>
            </div>
            <div>
              <h3>Ornements planaires</h3>
              <label>
                Sphère:
                <input
                  type="text"
                  name="sphere"
                  value={ornaments.sphere}
                  onChange={handleOrnamentChange}
                />
              </label>
              <label>
                Corde de liaison:
                <input
                  type="text"
                  name="cord"
                  value={ornaments.cord}
                  onChange={handleOrnamentChange}
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterDetails;
