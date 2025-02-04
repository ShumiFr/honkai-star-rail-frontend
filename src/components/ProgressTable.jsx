/* eslint-disable react/prop-types */
const ProgressTable = ({ characterProgress, handleCheckboxChangeProgress }) => {
  return (
    <div className="progress-table">
      <h2>Progression</h2>
      <table>
        <thead>
          <tr>
            <th>Obtenu</th>
            <th>Niveau 80</th>
            <th>Traces Complété</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                checked={characterProgress.obtained}
                onChange={() => handleCheckboxChangeProgress("obtained")}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={characterProgress.level80}
                onChange={() => handleCheckboxChangeProgress("level80")}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={characterProgress.tracesCompleted}
                onChange={() => handleCheckboxChangeProgress("tracesCompleted")}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProgressTable;
