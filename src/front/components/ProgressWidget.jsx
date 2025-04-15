import { useEffect, useState } from "react";
import { XPBar } from "./XPBar";

export const ProgressWidget = () => {
  const [progress, setProgress] = useState({ xp: 0, level: 1 });

  const loadProgress = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/xp", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setProgress(data);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <div className="my-4">
      <h5>Nivel {progress.level}</h5>
      <XPBar xp={progress.xp} maxXp={100} />
    </div>
  );
};