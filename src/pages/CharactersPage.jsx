/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, createContext } from "react";
import CharacterList from "../components/CharacterList";
import { getUser } from "../api/userApi";

export const CharacterContext = createContext();

const CharactersPage = ({ uid }) => {
  const [nickname, setNickname] = useState("");
  const [characters, setCharacters] = useState([]);

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
    <CharacterContext.Provider value={{ characters, setCharacters }}>
      <div className="characters-page">
        <h1>Personnages de Honkai Star Rail</h1>
        <CharacterList nickname={nickname} />
      </div>
    </CharacterContext.Provider>
  );
};

export default CharactersPage;
