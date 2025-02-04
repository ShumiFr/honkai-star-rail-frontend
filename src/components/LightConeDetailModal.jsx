/* eslint-disable react/prop-types */
const LightConeDetailModal = ({ lightCone, onClose, onAdd }) => {
  const handleAddLightCone = () => {
    onAdd(lightCone);
    onClose(); // Fermer la modale après l'ajout
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Détails du Cône de Lumière</h2>
        <div className="light-cone-preview">
          <h3>{lightCone.name}</h3>
          <img src={lightCone.icon} alt={lightCone.name} />
          <p dangerouslySetInnerHTML={{ __html: lightCone.effect }}></p>
        </div>
        <button onClick={handleAddLightCone}>Ajouter ce cône de lumière</button>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default LightConeDetailModal;
