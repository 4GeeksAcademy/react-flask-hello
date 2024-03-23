import React, { useEffect, useState } from "react";
import "../../styles/metrics.css";

export default function Metrics() {
  const [glasses, setGlasses] = useState(0);
  const [dailyProgress, setDailyProgress] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedProgress =
      JSON.parse(localStorage.getItem("dailyProgress")) || [];
    const lastEntry = savedProgress[savedProgress.length - 1];

    if (lastEntry && lastEntry.date === today) {
      setGlasses(lastEntry.glasses);
    } else if (savedProgress.length >= 7) {
      setDailyProgress([{ date: today, glasses: 0 }]);
    } else {
      savedProgress.push({ date: today, glasses: 0 });
      setDailyProgress(savedProgress);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dailyProgress", JSON.stringify(dailyProgress));
  }, [dailyProgress]);

  function handleBottle() {
    if (glasses < 8) {
      const updatedGlasses = glasses + 1;
      setGlasses(updatedGlasses);

      const today = new Date().toISOString().split("T")[0];
      const updatedProgress = dailyProgress.map((day) =>
        day.date === today ? { ...day, glasses: updatedGlasses } : day
      );
      setDailyProgress(updatedProgress);
    } else {
      alert("You've reached your goal for today!");
    }
  }


  return (
    <div className="bottle" onClick={handleBottle}>
      {[...Array(8)].map((_, index) => (
        <div key={index} className={index < glasses ? "glass filled" : "glass"}>
          {index + 1}
        </div>
      ))}
    </div>
  );
}

//   const [top, setTop] = useState(false);
//   const [middle, setMiddle] = useState(false);
//   const [bottom, setBottom] = useState(false);

//   function handleBottle() {
//     if (!bottom) {
//       setBottom(true);
//     } else if (!middle) {
//       setMiddle(true);
//     } else if (!top) {
//       setTop(true);
//     } else {
//       setTop(false);
//       setMiddle(false);
//       setBottom(false);
//     }
//   }

//   return (
//     <div class="bottle" onClick={() => handleBottle()}>
//       <div class={top ? "top active" : "top"}></div>
//       <div class={middle ? "middle active" : "middle"}></div>
//       <div class={bottom ? "bottom active" : "bottom"}></div>
//     </div>
//   );
// }
