/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getUser } from "../api/userApi";
import TeamBuilder from "../components/TeamBuilder";

const TeamBuilderPage = ({ uid }) => {
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

  console.log("Nickname in TeamBuilderPage:", nickname);

  return (
    <div>
      <TeamBuilder uid={uid} nickname={nickname} />
    </div>
  );
};

export default TeamBuilderPage;
