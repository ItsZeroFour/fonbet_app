import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Header from "../../components/header/Header";
import taskImg from "../../assets/images/task.png";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import footballers from "../../data/footballers.json";

const Task = ({ giftLink }) => {
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);
  const location = useLocation();

  const currentChapter = index < 4 ? 1 : index < 8 ? 2 : index < 12 ? 3 : 4;

  useEffect(() => {
    if (searchParams.get("index") && +searchParams.get("index")) {
      setIndex(+searchParams.get("index"));
    } else if (location.state?.index) {
      setIndex(location.state.index);
    } else {
      setIndex(0);
    }
  }, [searchParams, location]);

  return (
    <div className={style.task}>
      <div className={`wrapper ${style.task__wrapper}`}>
        <Header giftLink={giftLink} />

        <div className={style.task__text}>
          <h3>Глава {currentChapter}</h3>
          <p>
            {currentChapter === 1
              ? "Выпускной экзамен в школе скаутов"
              : currentChapter === 2
              ? "Практика в середнячке РПЛ"
              : currentChapter === 3
              ? "Переезд в крепкий европейский клуб"
              : "Руководство трансферами в европейском ТОП-клубе"}
          </p>
        </div>

        <img
          className={style.task__image}
          src={require(`../../assets/images/round_images/${footballers.items[index].roundImage}`)}
          alt="task"
        />

        <div className={style.task__task}>
          <h2>Раунд {index + 1}/16:</h2>
          <p>{footballers.items[index].task}</p>
          {index !== 15 ? (
            <p>
              Наберите <span>5 очков</span> по итогам раунда, чтобы закончить
              игру
            </p>
          ) : (
            <p>
              Наберите{" "}
              <span>
                {currentChapter === 1
                  ? "2 очка"
                  : currentChapter === 2
                  ? "3 очка"
                  : currentChapter === 3
                  ? "4 очка"
                  : "5 очков"}{" "}
              </span>
              , чтобы пройти в следующий раунд
            </p>
          )}
        </div>

        <Link
          className={style.task__link}
          to={index === 0 ? `/game?index=${index}` : `/game?index=${index}`}
        >
          Начать
        </Link>
      </div>
    </div>
  );
};

export default Task;
