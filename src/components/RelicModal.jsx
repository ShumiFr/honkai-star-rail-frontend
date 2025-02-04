/* eslint-disable react/prop-types */
import { useState } from "react";

const RelicModal = ({ relicSets, onClose, onAdd }) => {
  const [selectedRelicSet, setSelectedRelicSet] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleSelectRelicSet = (relicSet) => {
    setSelectedRelicSet(relicSet);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleAddRelicSet = () => {
    onAdd(selectedRelicSet);
    onClose(); // Fermer la modale après l'ajout
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sélectionner un set de reliques</h2>
        <ul>
          {relicSets.map((relicSet) => (
            <li
              key={relicSet.id}
              onClick={() => handleSelectRelicSet(relicSet)}
            >
              <img src={relicSet.icon} alt={relicSet.name} />
              {relicSet.name}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Fermer</button>
      </div>
      {isDetailModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Détails du Set de Reliques</h2>
            <div className="relic-preview">
              <h3>{selectedRelicSet.name}</h3>
              <img src={selectedRelicSet.icon} alt={selectedRelicSet.name} />
              <p>Effets du set:</p>
              <ul className="set-bonus-list">
                {selectedRelicSet.setBonus.map((bonus, index) => (
                  <li key={index} className="set-bonus-item">
                    <strong>Set de {bonus.needCount} pièce(s):</strong>
                    <span
                      dangerouslySetInnerHTML={{ __html: bonus.description }}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleAddRelicSet}>
              Ajouter ce set de reliques
            </button>
            <button onClick={handleCloseDetailModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelicModal;
