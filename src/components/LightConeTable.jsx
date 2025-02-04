/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const LightConeTable = ({
  selectedLightCones,
  handleCheckboxChange,
  handleRemoveLightCone,
  setIsModalOpen,
}) => {
  return (
    <div className="light-cone-table">
      <h2>Cônes de lumière</h2>
      <table>
        <thead>
          <tr>
            <th>Cône de lumière</th>
            <th>Obtenu</th>
            <th>Niveau 80</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {selectedLightCones.map((lightCone) => (
            <tr key={lightCone.id}>
              <td>{lightCone.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={lightCone.obtained}
                  onChange={() =>
                    handleCheckboxChange(lightCone.id, "obtained")
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={lightCone.level80}
                  onChange={() => handleCheckboxChange(lightCone.id, "level80")}
                />
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleRemoveLightCone(lightCone)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <button onClick={() => setIsModalOpen(true)}>
                Ajouter un cône de lumière
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LightConeTable;
