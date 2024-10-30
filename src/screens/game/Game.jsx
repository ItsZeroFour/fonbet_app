import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import footballers from "../../data/footballers.json";
import Header from "../../components/header/Header";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import arrowRight from "../../assets/icons/arrow_right_alt.svg";

const Game = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isCorrectChoose, setIsCorrectChoose] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrectChoosed, setIsCorrectChoosed] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [shuffledFootballers, setShuffledFootballers] = useState([]);
  const [dragX, setDragX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [correctChoosedImages, setCorrectChoosedImages] = useState([]);

  const item = footballers?.items[index];
  const totalCorrectItems = item?.footballers.filter(
    ({ isCorrect }) => isCorrect === true
  ).length;

  function checkIsEnd() {
    if (totalCorrectItems === isCorrectChoosed) {
      setIsEnd(true);
    } else if (isCorrectChoose >= item?.footballers.length) {
      setIsEnd(true);
    } else if (currentIndex + 1 > item?.footballers.length) {
      setIsEnd(true);
    }
  }

  useEffect(() => {
    checkIsEnd();
  }, [currentIndex]);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    setShuffledFootballers(shuffle([...item.footballers]));
  }, [item.footballers]);

  useEffect(() => {
    if (searchParams.get("index") && !isNaN(+searchParams.get("index"))) {
      setIndex(+searchParams.get("index"));
    } else {
      navigate("/task?index=0");
    }
  }, [searchParams]);

  const swiped = (dir, isCorrect) => {
    if (dir === "left" && !isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setIsCorrectChoose(true);
    } else if (dir === "right" && isCorrect) {
      setScore((prevScore) => prevScore + 2);
      setIsCorrectChoosed((prev) => prev + 1);
      setIsCorrectChoose(true);
      correctChoosedImages.push(shuffledFootballers[currentIndex].image);
    } else {
      setIsCorrectChoose(false);
    }

    checkIsEnd();
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 500);

    const x = dir === "left" ? -1000 : 1000;
    const card = document.querySelector(`.${style.card}`);

    if (card) {
      card.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${x}px)` }],
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
        }
      ).onfinish = () => {
        setSwiping(false);
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex;
        });
      };
    }
  };

  const handleSwipe = (direction, isCorrect) => {
    if (swiping) return; // Предотвращаем двойной свайп
    setSwiping(true);
    swiped(direction, isCorrect);
    setDragX(0);
  };

  const handlers = useSwipeable({
    delta: 10,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

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

        {!isEnd ? (
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

                  {!swiping &&
                    currentIndex < shuffledFootballers.length &&
                    shuffledFootballers.length > 0 && (
                      <motion.div
                        {...handlers}
                        className={style.swipe}
                        initial={{ x: 0, rotate: 0 }}
                        animate={{ x: 0, rotate: 0 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDrag={(e, info) => {
                          setDragX(info.offset.x);
                        }}
                        onDragEnd={(e, info) => {
                          const direction =
                            info.offset.x > 0 ? "right" : "left";
                          const isCorrect =
                            shuffledFootballers[currentIndex]?.isCorrect;

                          if (Math.abs(info.offset.x) > 150) {
                            handleSwipe(direction, isCorrect);
                          } else {
                            setDragX(0);
                          }
                        }}
                        style={{ position: "absolute" }}
                      >
                        <motion.div
                          className={style.card}
                          style={{
                            rotate: dragX / 10,
                            opacity: 1 - Math.abs(dragX) / 300,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <img
                            src={require(`../../assets/images/footballers/${shuffledFootballers[currentIndex]?.image}`)}
                            alt="card"
                          />
                          <h3>{shuffledFootballers[currentIndex]?.name}</h3>
                        </motion.div>
                      </motion.div>
                    )}
                </div>

                <div className={style.game__cards__nav}>
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    onClick={() =>
                      handleSwipe(
                        "left",
                        shuffledFootballers[currentIndex]?.isCorrect
                      )
                    }
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
                        fill="white"
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
                    onClick={() =>
                      handleSwipe(
                        "right",
                        shuffledFootballers[currentIndex]?.isCorrect
                      )
                    }
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
        ) : (
          <div className={style.game__final}>
            <div className={style.game__total}>
              <h1>{score >= 10 ? "Раунд пройден!" : "Вы проиграли :("}</h1>

              <div>
                <p>
                  {isCorrectChoosed}/
                  {
                    shuffledFootballers.filter(
                      ({ isCorrect }) => isCorrect === true
                    ).length
                  }
                </p>
                <p>Очки: {score}</p>
              </div>
            </div>

            <p>
              {score >= 10 ? (
                <>
                  Поздравляем, скаут! <br /> Вот кого из нужных игроков вы взяли
                  в команду:
                </>
              ) : (
                <>
                  Извините :( <br /> Вот кого из нужных игроков вы взяли в
                  команду:
                </>
              )}
            </p>

            <div className={style.game__final__chosed}>
              <ul>
                {item.footballers
                  .filter(({ isCorrect }) => isCorrect === true)
                  .map(({ image }, idx) => (
                    <li key={idx}>
                      <motion.img
                        src={require(`../../assets/images/footballers/${image}`)}
                        alt={idx + 1}
                        initial={{ opacity: 0.25 }}
                        animate={
                          correctChoosedImages.includes(image) && { opacity: 1 }
                        }
                        transition={
                          correctChoosedImages.includes(image) && {
                            delay: 2,
                            duration: 0.5,
                          }
                        }
                      />
                    </li>
                  ))}
              </ul>
            </div>

            {score >= 10 ? (
              <div className={style.game__banner}>
                <h2>Примите участие в розыгрыше</h2>

                <div className={style.game__banner__cupon}>
                  <p>100 000 ₽*</p>
                </div>

                <Link className={style.game__banner__link_1} to="/">
                  Регистрация
                </Link>

                <div className={style.game__banner__link__container}>
                  <Link className={style.game__banner__link_2} to="/">
                    Я уже с FONBET <img src={arrowRight} alt="arrow right" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className={style.game__banner}>
                <h2>Вам подарок от FONBET!</h2>

                <div className={style.game__banner__cupon}>
                  <p>до 15 000 ₽*</p>
                </div>

                <p>
                  Пройдите игру до конца, чтобы принять участие в розыгрыше100
                  000 ₽ фрибетами.
                </p>

                <Link className={style.game__banner__link_1} to="/">
                  Забрать подарок
                </Link>
              </div>
            )}

            {score >= 10 ? (
              <Link
                to={`/game?index=${index + 1}`}
                onClick={() =>
                  (window.location.href = `/game?index=${index + 1}`)
                }
              >
                Играть дальше
              </Link>
            ) : (
              <Link
                to={`/game?index=${index}`}
                onClick={() => (window.location.href = `/game?index=${index}`)}
              >
                Играть снова
              </Link>
            )}

            <p>
              *Предоставляется в виде бонусов (Фрибетов), подробнее в правилах
              игры
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
