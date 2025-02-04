/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getUser } from "../api/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({ uid, onMenuClick }) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user with UID:", uid);
        const data = await getUser(uid);
        console.log("User data:", data);
        setNickname(data.nickname);
      } catch (error) {
        console.error("Erreur lors de la récupération du nickname:", error);
      }
    };

    if (uid) {
      fetchUser();
    }
  }, [uid]);

  return (
    <header>
      <button className="menu-button" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {nickname && <p>Bienvenue, {nickname} !</p>}
    </header>
  );
};

export default Header;
