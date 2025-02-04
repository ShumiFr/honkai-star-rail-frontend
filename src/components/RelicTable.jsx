/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RelicTable = ({
  selectedRelics,
  handleCheckboxChangeRelic,
  handleRemoveRelic,
  setIsRelicModalOpen,
}) => {
  return (
    <div className="relic-table">
      <h2>Reliques</h2>
      {selectedRelics.map((relic) => (
        <div key={relic.id} className="relic-table">
          <table>
            <thead>
              <tr>
                <th colSpan="4">{relic.name}</th>
              </tr>
              <tr>
                <th>Tête</th>
                <th>Mains</th>
                <th>Corps</th>
                <th>Pieds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={relic.head}
                    onChange={() => handleCheckboxChangeRelic(relic.id, "head")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={relic.hands}
                    onChange={() =>
                      handleCheckboxChangeRelic(relic.id, "hands")
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={relic.body}
                    onChange={() => handleCheckboxChangeRelic(relic.id, "body")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={relic.feet}
                    onChange={() => handleCheckboxChangeRelic(relic.id, "feet")}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <button
                    className="delete-button"
                    onClick={() => handleRemoveRelic(relic)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <button
        className="add-relic-button"
        onClick={() => setIsRelicModalOpen(true)}
      >
        Ajouter une relique
      </button>
    </div>
  );
};

export default RelicTable;
