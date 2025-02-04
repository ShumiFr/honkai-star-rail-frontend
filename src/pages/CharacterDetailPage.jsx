/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCharacterById,
  getAllLightCones,
  getAllRelics,
} from "../api/characterApi";
import {
  addLightCone,
  updateLightCone,
  getUser,
  updateUser,
  addRelic,
  updateRelic,
  removeRelic,
  updateCharacterProgress, // Assurez-vous que cette ligne est présente
} from "../api/userApi";
import LightConeModal from "../components/LightConeModal";
import RelicModal from "../components/RelicModal";
import CharacterHeader from "../components/CharacterHeader";
import LightConeTable from "../components/LightConeTable";
import RelicTable from "../components/RelicTable";
import ProgressTable from "../components/ProgressTable";

const elementColors = {
  Vent: "#61cf93",
  Feu: "#ee473d",
  Glace: "#2692d3",
  Foudre: "#c65ade",
  Quantique: "#7e74eb",
  Imaginaire: "#e6d863",
};

const CharacterDetailPage = ({ uid }) => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [lightCones, setLightCones] = useState([]);
  const [relicSets, setRelicSets] = useState([]);
  const [selectedLightCones, setSelectedLightCones] = useState([]);
  const [selectedRelics, setSelectedRelics] = useState([]);
  const [characterProgress, setCharacterProgress] = useState({
    obtained: false,
    level80: false,
    tracesCompleted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRelicModalOpen, setIsRelicModalOpen] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du personnage:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  useEffect(() => {
    const fetchLightCones = async () => {
      try {
        const data = await getAllLightCones();
        setLightCones(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des cônes de lumière:",
          error
        );
      }
    };

    fetchLightCones();
  }, []);

  useEffect(() => {
    const fetchRelics = async () => {
      try {
        const data = await getAllRelics();
        setRelicSets(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des reliques:", error);
      }
    };

    fetchRelics();
  }, []);

  useEffect(() => {
    const fetchUserLightConesAndRelics = async () => {
      try {
        const user = await getUser(uid);
        const characterLightCones = user.characterLightCones.find(
          (clc) => clc.characterId === parseInt(id)
        );
        setSelectedLightCones(
          characterLightCones ? characterLightCones.lightCones : []
        );
        setSelectedRelics(
          characterLightCones ? characterLightCones.relics : []
        );
        const characterProgress = user.characterProgress.find(
          (cp) => cp.characterId === parseInt(id)
        );
        setCharacterProgress(
          characterProgress || {
            obtained: false,
            level80: false,
            tracesCompleted: false,
          }
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des cônes de lumière et des reliques de l'utilisateur:",
          error
        );
      }
    };

    fetchUserLightConesAndRelics();
  }, [uid, id]);

  const handleAddLightCone = async (lightCone) => {
    try {
      const newLightCone = {
        id: lightCone.id,
        name: lightCone.name,
        obtained: false,
        level80: false,
      };
      await addLightCone(uid, id, newLightCone);
      setSelectedLightCones([...selectedLightCones, newLightCone]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du cône de lumière:", error);
    }
  };

  const handleRemoveLightCone = async (lightCone) => {
    try {
      const updatedLightCones = selectedLightCones.filter(
        (lc) => lc.id !== lightCone.id
      );
      const user = await getUser(uid);
      const characterLightCones = user.characterLightCones.find(
        (clc) => clc.characterId === parseInt(id)
      );
      if (characterLightCones) {
        characterLightCones.lightCones = updatedLightCones;
        await updateUser(uid, {
          characterLightCones: user.characterLightCones,
        });
        setSelectedLightCones(updatedLightCones);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du cône de lumière:", error);
    }
  };

  const handleCheckboxChange = async (lightConeId, field) => {
    try {
      const updatedLightCones = selectedLightCones.map((lc) => {
        if (lc.id === lightConeId) {
          return { ...lc, [field]: !lc[field] };
        }
        return lc;
      });
      const updatedLightCone = updatedLightCones.find(
        (lc) => lc.id === lightConeId
      );
      await updateLightCone(uid, id, lightConeId, updatedLightCone);
      setSelectedLightCones(updatedLightCones);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du cône de lumière:", error);
    }
  };

  const handleAddRelic = async (relicSet) => {
    try {
      const newRelicSet = {
        id: relicSet.id,
        name: relicSet.name,
        head: false,
        hands: false,
        body: false,
        feet: false,
      };
      await addRelic(uid, id, newRelicSet);
      setSelectedRelics([...selectedRelics, newRelicSet]);
      setIsRelicModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la relique:", error);
    }
  };

  const handleRemoveRelic = async (relic) => {
    try {
      const updatedRelics = selectedRelics.filter((r) => r.id !== relic.id);
      await removeRelic(uid, id, relic.id);
      setSelectedRelics(updatedRelics);
    } catch (error) {
      console.error("Erreur lors de la suppression de la relique:", error);
    }
  };

  const handleCheckboxChangeRelic = async (relicId, field) => {
    try {
      const updatedRelics = selectedRelics.map((relic) => {
        if (relic.id === relicId) {
          return { ...relic, [field]: !relic[field] };
        }
        return relic;
      });
      const updatedRelic = updatedRelics.find((relic) => relic.id === relicId);
      await updateRelic(uid, id, relicId, updatedRelic);
      setSelectedRelics(updatedRelics);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la relique:", error);
    }
  };

  const handleCheckboxChangeProgress = async (field) => {
    try {
      const updatedProgress = {
        ...characterProgress,
        [field]: !characterProgress[field],
      };
      await updateCharacterProgress(uid, id, updatedProgress);
      setCharacterProgress(updatedProgress);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la progression du personnage:",
        error
      );
    }
  };

  if (!character) {
    return <div>Chargement...</div>;
  }

  const elementColor = elementColors[character.combatType.name] || "white";

  return (
    <div className="character-detail">
      <CharacterHeader character={character} elementColor={elementColor} />
      <ProgressTable
        characterProgress={characterProgress}
        handleCheckboxChangeProgress={handleCheckboxChangeProgress}
      />
      <LightConeTable
        lightCones={lightCones}
        selectedLightCones={selectedLightCones}
        handleCheckboxChange={handleCheckboxChange}
        handleRemoveLightCone={handleRemoveLightCone}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && (
        <LightConeModal
          lightCones={lightCones.filter(
            (lc) => lc.path.id === character.path.id
          )}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddLightCone}
        />
      )}
      <RelicTable
        selectedRelics={selectedRelics}
        handleCheckboxChangeRelic={handleCheckboxChangeRelic}
        handleRemoveRelic={handleRemoveRelic}
        setIsRelicModalOpen={setIsRelicModalOpen}
      />
      {isRelicModalOpen && (
        <RelicModal
          relicSets={relicSets}
          onClose={() => setIsRelicModalOpen(false)}
          onAdd={handleAddRelic}
        />
      )}
    </div>
  );
};

export default CharacterDetailPage;
