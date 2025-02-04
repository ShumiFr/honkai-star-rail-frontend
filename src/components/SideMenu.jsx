/* eslint-disable react/prop-types */

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <nav>
        <ul>
          <li>
            <a href="/characters">Personnages</a>
          </li>
          <li>
            <a href="/team-builder">Constructeur d&apos;Équipe</a>
          </li>
          <li>
            <a href="/teams">Mes Équipes</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
