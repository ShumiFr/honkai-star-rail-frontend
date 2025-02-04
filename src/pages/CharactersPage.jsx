/* eslint-disable react/prop-types */

import CharacterList from "../components/CharacterList";
import { useState, useEffect } from "react";
import { getUser } from "../api/userApi";

const CharactersPage = ({ uid }) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(uid);
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
    <div className="characters-page">
      <h1>Personnages de Honkai Star Rail</h1>
      <CharacterList nickname={nickname} />
    </div>
  );
};

export default CharactersPage;
