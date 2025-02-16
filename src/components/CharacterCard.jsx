/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandFist,
  faVirus,
  faFlask,
  faMedkit,
} from "@fortawesome/free-solid-svg-icons";
import notFoundImage from "../assets/not-found.png";

const roleIcons = {
  "DPS Principal": faHandFist,
  "DPS Secondaire": faVirus,
  Soutien: faFlask,
  Support: faMedkit,
};

const roleColors = {
  "DPS Principal": "red",
  "DPS Secondaire": "darkviolet",
  Soutien: "yellow",
  Support: "green",
};

const CharacterCard = ({ character }) => {
  const [imageSrc, setImageSrc] = useState(
    character.shopItemIcon || notFoundImage
  );
  const cardClass = character.stars === 5 ? "five-stars" : "four-stars";
  const displayName =
    character.name === "{NICKNAME}" ? "Pionnier" : character.name;
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageSrc(notFoundImage);
  };

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  console.log("Character data:", character); // Log des données du personnage

  return (
    <div className={`character-card ${cardClass}`} onClick={handleClick}>
      <div className="combat-type-icon">
        <img src={character.combatType.icon} alt={character.combatType.name} />
      </div>
      <div className="role-icon">
        <FontAwesomeIcon
          icon={roleIcons[character.role]}
          color={roleColors[character.role]}
        />
      </div>
      <img
        src={imageSrc}
        alt={character.name}
        onError={handleImageError}
        loading="lazy"
      />
      <h3>{displayName}</h3>
    </div>
  );
};

export default CharacterCard;
