/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";

const LoginPage = ({ setUid }) => {
  const [uid, setUidInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(uid);
      setUid(uid);
      localStorage.setItem("uid", uid);
      navigate("/characters");
    } catch (error) {
      console.log(error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <label>
          UID:
          <input
            type="text"
            value={uid}
            onChange={(e) => setUidInput(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
