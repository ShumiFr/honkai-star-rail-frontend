import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import CharactersPage from "./pages/CharactersPage";
import TeamBuilderPage from "./pages/TeamBuilderPage";
import TeamsPage from "./pages/TeamsPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

const App = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (uid) {
      localStorage.setItem("uid", uid);
    } else {
      localStorage.removeItem("uid");
    }
  }, [uid]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <Header uid={uid} onMenuClick={handleMenuClick} />
      <SideMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
      <Routes>
        <Route path="/" element={<LoginPage setUid={setUid} />} />
        <Route path="/characters" element={<CharactersPage uid={uid} />} />
        <Route path="/team-builder" element={<TeamBuilderPage uid={uid} />} />
        <Route path="/teams" element={<TeamsPage uid={uid} />} />
        <Route
          path="/character/:id"
          element={<CharacterDetailPage uid={uid} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
