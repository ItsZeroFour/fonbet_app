import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import gift from "../../assets/icons/gift.png";
import voice from "../../assets/icons/voice.svg";
import voiceOff from "../../assets/icons/voice-off.svg";
import { motion } from "framer-motion";

const Header = ({ giftLink, index, currentChapter }) => {
  const [animationSequence, setAnimationSequence] = useState("pulse");

  const navigate = useNavigate();

  const [offVoice, setOffVoice] = useState(() => {
    return localStorage.getItem("offVoice") === "true";
  });

  useEffect(() => {
    localStorage.setItem("offVoice", offVoice);
  }, [offVoice]);

  const animationVariants = {
    pulse: {
      scale: [1, 1.1, 1], // Немного более плавная пульсация
      transition: {
        duration: 0.5, // Замедленная анимация пульсации
        repeat: 3, // 3 повторения пульсации
        repeatType: "loop",
      },
    },
    rotate: {
      rotate: 360, // Вращение на 360 градусов
      transition: {
        duration: 1, // Длительность вращения
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationSequence((prev) => (prev === "pulse" ? "rotate" : "pulse"));
    }, 2500); // 3x0.5 (пульсация) + 3 секунды на завершение вращения

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    if (index !== undefined) {
      return navigate("/task", {
        state: { index: index + 1, currentChapter },
      });
    }
  };

  return (
    <header className={style.head}>
      <Link to={giftLink} target="_blank">
        <img src={logo} alt="logo" />
      </Link>

      <div className={style.head__buttons}>
        <Link
          onClick={() => {
            if (window.ym) {
              window.ym(98751165, "reachGoal", "podarok----conversion");
            }
          }}
          to={giftLink}
          target="_blank"
        >
          <motion.img
            src={gift}
            alt="gift"
            variants={animationVariants}
            animate={animationSequence}
          />
        </Link>

        <button onClick={() => setOffVoice(!offVoice)}>
          <img src={offVoice ? voiceOff : voice} alt="voice" />
        </button>
      </div>
    </header>
  );
};

export default Header;
