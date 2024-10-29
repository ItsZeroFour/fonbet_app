import React, { useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import footballers from "../../data/footballers.json";
import TinderCard from "react-tinder-card";
import Header from "../../components/header/Header";
import { motion } from "framer-motion";

const Game = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const [isCorrectChoose, setIsCorrectChoose] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrectChoosed, setIsCorrectChoosed] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [shuffledFootballers, setShuffledFootballers] = useState([]);

  const item = footballers?.items[index];
  const totalCorrectItems = item?.footballers.filter(
    ({ isCorrect }) => isCorrect === true
  ).length;

  function checkIsEnd() {
    if (totalCorrectItems === isCorrectChoosed + 1) {
      setIsEnd(true);
    } else if (isCorrectChoose >= item?.footballers.length) {
      setIsEnd(true);
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    setShuffledFootballers(shuffle([...item.footballers]));
  }, [item.footballers]);

  const childRefs = useMemo(
    () =>
      Array(shuffledFootballers.length)
        .fill(0)
        .map(() => React.createRef()),
    [shuffledFootballers]
  );

  useEffect(() => {
    if (searchParams.get("index") && !isNaN(+searchParams.get("index"))) {
      setIndex(+searchParams.get("index"));
    } else {
      navigate("/task?index=0");
    }
  }, [searchParams]);

  const swiped = (dir, name, isCorrect, idx) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (dir === "left" && !isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setIsCorrectChoose(true);
    } else if (dir === "right" && isCorrect) {
      setScore((prevScore) => prevScore + 2);
      setIsCorrectChoosed((prev) => prev + 1);
      setIsCorrectChoose(true);
    } else {
      setIsCorrectChoose(false);
    }

    checkIsEnd();
    setShowMessage(true);
    setShowCards(false);
    setTimeout(() => {
      setShowMessage(false);
      setShowCards(true);
    }, 500);
  };

  const outOfFrame = (name, idx) => {
    if (idx >= 10) {
      childRefs[idx].current?.restoreCard();
    }

    console.log(idx <= 10);
    
  };

  const swipe = async (dir) => {
    console.log(currentIndex);

    const currentCardRef = childRefs.reverse()[currentIndex].current;

    if (currentCardRef) await currentCardRef.swipe(dir);
  };

  const buttonVariants = {
    initial: { backgroundColor: "transparent", color: "#fff" },
    animate: { backgroundColor: "#e80024", color: "#fff" },
    hover: { backgroundColor: "#fff", color: "#fff", scale: 1.1 },
  };

  const buttonVariants2 = {
    initial: { backgroundColor: "transparent", color: "#fff" },
    animate: { backgroundColor: "#fff", fill: "#e80024" },
    hover: { backgroundColor: "#e80024", fill: "#fff", scale: 1.1 },
  };

  return (
    <div className={style.game}>
      <div className={`wrapper ${style.game__wrapper}`}>
        <Header />
        <div className={style.game__container}>
          {item && (
            <>
              <div className={style.game__task}>
                <div className={style.game__task__index}>{item.index}</div>
                <p>{item.task}</p>
              </div>

              <div className={style.game__task__score}>
                <ul>
                  {item.footballers.map((_, idx) => (
                    <li
                      key={idx}
                      style={
                        currentIndex === idx
                          ? { background: "#E80024" }
                          : { background: "rgba(255, 255, 255, 0.1)" }
                      }
                    ></li>
                  ))}
                </ul>

                <p>Очки: {score}</p>
              </div>

              <div className={style.game__cards__container}>
                {showMessage && (
                  <div className={style.message}>
                    <p>{isCorrectChoose ? "Верно!" : "Не верно"}</p>
                  </div>
                )}

                {shuffledFootballers.map((card, idx) => (
                  <TinderCard
                    ref={childRefs[idx]}
                    className={style.swipe}
                    key={card.name}
                    onSwipe={(dir) => {
                      swiped(dir, card.name, card.isCorrect, idx);
                    }}
                    onCardLeftScreen={() => outOfFrame(card.name, idx)}
                  >
                    {showCards && (
                      <div className={style.card}>
                        <img
                          src={require(`../../assets/images/footballers/${card.image}`)}
                          alt="card"
                        />
                        <h3>{card.name}</h3>
                      </div>
                    )}
                  </TinderCard>
                ))}
              </div>

              <div className={style.game__cards__nav}>
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  onClick={() => swipe("left")}
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.87124 0.589305C3.10304 -0.178898 1.85754 -0.178898 1.08934 0.589305C0.321133 1.35751 0.321133 2.60301 1.08934 3.37121L7.71812 10L1.08933 16.6288C0.321133 17.397 0.321133 18.6425 1.08934 19.4107C1.85754 20.1789 3.10304 20.1789 3.87124 19.4107L10.5 12.7819L17.1288 19.4107C17.897 20.1789 19.1425 20.1789 19.9107 19.4107C20.6789 18.6425 20.6789 17.397 19.9107 16.6288L13.2819 10L19.9107 3.37121C20.6789 2.60301 20.6789 1.35751 19.9107 0.589305C19.1425 -0.178898 17.897 -0.178898 17.1288 0.589305L10.5 7.21809L3.87124 0.589305Z"
                      fill="#fff"
                    />
                  </svg>
                </motion.button>

                <ul>
                  {item.footballers
                    .filter(({ isCorrect }) => isCorrect === true)
                    .map((_, idx) => (
                      <li
                        key={idx}
                        style={
                          isCorrectChoosed >= idx + 1
                            ? { opacity: 1 }
                            : { opacity: 0.25 }
                        }
                      >
                        <img
                          src={require(`../../assets/images/tshirts/${
                            idx + 1
                          }.png`)}
                          alt={idx + 1}
                        />
                      </li>
                    ))}
                </ul>

                <motion.button
                  variants={buttonVariants2}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  onClick={() => swipe("right")}
                >
                  <svg
                    width="23"
                    height="16"
                    viewBox="0 0 23 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.4238 1.08602C23.1921 1.85423 23.1921 3.09973 22.4238 3.86793L11.3778 14.914C10.6096 15.6822 9.36409 15.6822 8.59589 14.914L0.576152 6.89425C-0.192051 6.12604 -0.192051 4.88054 0.576152 4.11234C1.34435 3.34414 2.58986 3.34414 3.35806 4.11234L9.98684 10.7411L19.6419 1.08602C20.4101 0.317822 21.6556 0.317822 22.4238 1.08602Z"
                      fill="#e80024"
                    />
                  </svg>
                </motion.button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
