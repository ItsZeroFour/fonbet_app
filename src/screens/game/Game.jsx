import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import footballers from "../../data/footballers.json";
import TinderCard from "react-tinder-card";

const Game = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showCards, setShowCards] = useState(true);

  const item = footballers?.items[index];

  useEffect(() => {
    if (searchParams.get("index") && +searchParams.get("index") !== NaN) {
      setIndex(+searchParams.get("index"));
    } else {
      navigate("/task?index=0");
    }
  }, [searchParams]);

  const swiped = (dir, name) => {
    console.log(`Swiped ${dir} on ${name}`);

    setShowMessage(true);
    setShowCards(false);

    setTimeout(() => {
      setShowMessage(false);
      setShowCards(true);
    }, 500);
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen`);
  };

  return (
    <div className={style.game}>
      <div className={`wrapper ${style.game__wrapper}`}>
        {item && (
          <React.Fragment>
            <div className={style.game__task}>
              <div className={style.game__task__index}>{item.index}</div>
              <p>{item.task}</p>
            </div>

            <div className={style.game__task__score}>
              <ul>
                {item.footballers.map(({ index }) => (
                  <li key={index}></li>
                ))}
              </ul>

              <p>Очки: 0</p>
            </div>

            <div className={style.game__cards__container}>
              {showMessage && (
                <div className={style.message}>
                  <p>Свайп выполнен!</p>
                </div>
              )}

              {item.footballers.map((card) => (
                <TinderCard
                  className={style.swipe}
                  key={card.name}
                  onSwipe={(dir) => swiped(dir, card.name)}
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Game;
