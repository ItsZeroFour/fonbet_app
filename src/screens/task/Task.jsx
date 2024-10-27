import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Header from "../../components/header/Header";
import taskImg from "../../assets/images/task.png";
import { Link, useSearchParams } from "react-router-dom";
import footballers from "../../data/footballers.json";

const Task = () => {
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (searchParams.get("index") && +searchParams.get("index")) {
      setIndex(+searchParams.get("index"));
    } else {
      setIndex(0);
    }
  }, [searchParams]);

  return (
    <div className={style.task}>
      <div className={`wrapper ${style.task__wrapper}`}>
        <Header />

        <div className={style.task__text}>
          <h3>Глава 1</h3>
          <p>Выпускной экзамен в школе скаутов</p>
        </div>

        <img className={style.task__image} src={taskImg} alt="task" />

        <div className={style.task__task}>
          <h2>{footballers.items[index].round}:</h2>
          <p>{footballers.items[index].task}</p>
          <p>
            Наберите <span>10 очков</span>, чтобы пройти в следующий раунд
          </p>
        </div>

        <Link className={style.task__link} to={`/game?index=${index}`}>
          Начать
        </Link>
      </div>
    </div>
  );
};

export default Task;
