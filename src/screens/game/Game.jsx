import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import footballers from "../../data/footballers.json";
import TinderCard from "react-tinder-card";
import Header from "../../components/header/Header";

const Game = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const [isCorrectChoose, setIsCorrectChoose] = useState(Boolean);
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
    }
  }

  useEffect(() => {
    setShuffledFootballers(shuffle([...item.footballers]));
  }, [item.footballers]);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (searchParams.get("index") && +searchParams.get("index") !== NaN) {
      setIndex(+searchParams.get("index"));
    } else {
      navigate("/task?index=0");
    }
  }, [searchParams]);

  const swiped = (dir, _, isCorrect, index) => {
    setCurrentIndex(index);

    if (dir === "left" && isCorrect === false) {
      setScore((prevScore) => prevScore + 1);
      setIsCorrectChoose(true);
    } else if (dir === "left" && isCorrect === true) {
      setScore((prevScore) => prevScore + 0);
      setIsCorrectChoose(false);
    } else if (dir === "right" && isCorrect === true) {
      setScore((prevScore) => prevScore + 2);
      setIsCorrectChoosed((prevCorrectChoosed) => prevCorrectChoosed + 1);
      setIsCorrectChoose(true);
    } else {
      setScore((prevScore) => prevScore + 0);
      setIsCorrectChoose(false);
    }

    /* CHECK IF WE CHOOSE ALL CORRECT ITEMS - END THE GAME */
    checkIsEnd();

    setShowMessage(true);
    setShowCards(false);

    setTimeout(() => {
      setShowMessage(false);
      setShowCards(true);
    }, 500);
  };

  const outOfFrame = (name) => {
    // console.log(`${name} left the screen`);
  };

  return (
    <div className={style.game}>
      <div className={`wrapper ${style.game__wrapper}`}>
        <Header />
        <div className={style.game__container}>
          {item && (
            <React.Fragment>
              <div className={style.game__task}>
                <div className={style.game__task__index}>{item.index}</div>
                <p>{item.task}</p>
              </div>

              <div className={style.game__task__score}>
                <ul>
                  {item.footballers.map((_, index) => (
                    <li
                      key={index}
                      style={
                        currentIndex === index
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

                {shuffledFootballers.map((card, index) => (
                  <TinderCard
                    className={style.swipe}
                    key={card.name}
                    onSwipe={(dir) => {
                      swiped(
                        dir,
                        card.name,
                        card.isCorrect,
                        item.footballers.length - index
                      );
                      console.log(index);
                    }}
                    onCardLeftScreen={() => outOfFrame(card.name)}
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
                <button>
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
                      fill="white"
                    />
                  </svg>
                </button>

                <ul>
                  {item.footballers
                    .filter(({ isCorrect }) => isCorrect === true)
                    .map((_, index) => (
                      <li
                        key={index}
                        style={
                          isCorrectChoosed >= index + 1
                            ? { opacity: 1 }
                            : { opacity: 0.25 }
                        }
                      >
                        <img
                          src={require(`../../assets/images/tshirts/${
                            index + 1
                          }.png`)}
                          alt={index + 1}
                        />
                      </li>
                    ))}
                </ul>

                <button>
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.87124 0.589305C3.10304 -0.178898 1.85754 -0.178898 1.08934 0.589305C0.321133 1.35751 0.321133 2.60301 1.08934 3.37121L7.71812 10L1.08933 16.6288C0.321133 17.397 0.321133 18.6425 1.08934 19.4107C1.85754 20.1789 3.10304 20.1789 3.87124 19.4107L10.5 12.7819L17.1288 19.4107C17.897 20.1789 19.1425 20.1789 19.9107 19.4107C20.6789 18.6425 20.6789 17.397 19.9107 16.6288L13.2819 10L19.9107 3.37121C20.6789 2.60301 20.6789 1.35751 19.9107 0.589305C19.1425 -0.178898 17.897 -0.178898 17.1288 0.589305L10.5 7.21809L3.87124 0.589305Z"
                      fill="#e80024"
                    />
                  </svg>
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
