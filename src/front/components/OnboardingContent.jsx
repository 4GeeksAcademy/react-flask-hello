import { div } from "framer-motion/client";
import "../assets/styles/Onboarding.module.css";

import { useState } from "react";

const OnboardingText = () => {
  const steps = [
    {
      h2: "Welcome to Level Up",
      p: "Your adventure starts here. Level Up is a gamified platform that turns your real-life goals into weekly missions. Level up as you improve your real life.",
      img: "src/front/assets/styles/images/Moti_Feliz.webp"
    },
    {
      h2: "How It Works",
      p: "Each week, you'll get missions tailored to your goals: health, learning, habits, creativity... Every completed task gives you XP and boosts your stats. It’s all about staying motivated and tracking real evolution.",
      img: "src/front/assets/styles/images/PtoAmoMancuernas.webp"
    },
    {
      h2: "Make your progress visible.",
      p: "Your personal stats panel shows how you’re evolving each week. Track your level, consistency, energy points, and improvement areas: clean and distraction-free.",
      img: "src/front/assets/styles/images/Alegre1.webp"
    },
    {
      h2: "Every user has their path.",
      p: "Choose your focus: physical, mental, creative... or mix it all! Turn categories on or off. Adjust the difficulty. Start easy. Raise the challenge when you're ready.",
      img: "src/front/assets/styles/images/Enamorado.webp"
    },
    {
      h2: "Ready?",
      p: "You’re all set! Start your first mission, earn your first XP, and see how your mindset shifts. This isn’t just another app. This is a whole new system.",
      img: "src/front/assets/styles/images/Confeti.webp"
    }
  ];

  const button_content = [
    { title: "Next" },
    { title: "Next" },
    { title: "Next" },
    { title: "Next" },
    { title: "Start" }
  ];

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < steps.length - 1) {
      setIndex(index + 1);
    } else {
      console.log("Start pressed! 🚀"); // Aquí redirigir a home.
    }
  };

  return (
    <div className="page">
      <div className="moty_text">
        <div className="moty_img">
          <img src={steps[index].img} alt="moty" />
        </div>
        <div className="text">
          <h2>{steps[index].h2}</h2>
          <p>{steps[index].p}</p>
        </div>
      </div>
        <div className="button_space">
          <div className="next_button" onClick={handleNext}>
            {button_content[index].title}
          </div>
        </div>
    </div>
  );
};

export default OnboardingText;