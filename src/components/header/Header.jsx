import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import gift from "../../assets/icons/gift.png";
import voice from "../../assets/icons/voice.svg";
import voiceOff from "../../assets/icons/voice-off.svg";
import { motion } from "framer-motion";

const Header = ({ giftLink, index, currentChapter }) => {
  const navigate = useNavigate();

  const [offVoice, setOffVoice] = useState(() => {
    return localStorage.getItem("offVoice") === "true";
  });

  useEffect(() => {
    localStorage.setItem("offVoice", offVoice);
  }, [offVoice]);

  const pulseAnimation = {
    scale: [1, 1.2, 1], // Увеличение и возврат к исходному размеру
    transition: {
      repeat: Infinity, // Бесконечное повторение
      repeatType: "loop",
      duration: 0.3, // Длительность одного цикла
      repeatDelay: 1, // Задержка перед повторением
    },
  };

  const goToNext = () => {
    if (index !== undefined) {
      return navigate("/task", {
        state: { index: index + 1, currentChapter },
      });
    }
  };

  return (
    <header className={style.head}>
      <button
        onClick={() => goToNext()}
        // to="#"
        // to={giftLink}
        //  target="_blank"
      >
        <img src={logo} alt="logo" />
      </button>

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
          <motion.img src={gift} alt="gift" animate={pulseAnimation} />
        </Link>

        <button onClick={() => setOffVoice(!offVoice)}>
          <img src={offVoice ? voiceOff : voice} alt="voice" />
        </button>
      </div>
    </header>
  );
};

export default Header;
