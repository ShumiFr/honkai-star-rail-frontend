/* eslint-disable react/prop-types */
import { useState } from "react";
import LightConeDetailModal from "./LightConeDetailModal";

const LightConeModal = ({ lightCones, onClose, onAdd }) => {
  const [selectedLightCone, setSelectedLightCone] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleSelectLightCone = (lightCone) => {
    setSelectedLightCone(lightCone);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sélectionner un cône de lumière</h2>
        <ul>
          {lightCones.map((lightCone) => (
            <li
              key={lightCone.id}
              onClick={() => handleSelectLightCone(lightCone)}
            >
              <img src={lightCone.icon} alt={lightCone.name} />
              {lightCone.name}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Fermer</button>
      </div>
      {isDetailModalOpen && (
        <LightConeDetailModal
          lightCone={selectedLightCone}
          onClose={handleCloseDetailModal}
          onAdd={onAdd}
        />
      )}
    </div>
  );
};

export default LightConeModal;
