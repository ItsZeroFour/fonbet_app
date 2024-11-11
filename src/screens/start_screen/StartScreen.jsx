import React from "react";
import style from "./style.module.scss";
import Header from "../../components/header/Header";
import title from "../../assets/images/start_title.svg";
import ball from "../../assets/icons/start/ball.svg";
import group_search from "../../assets/icons/start/group_search.svg";
import route from "../../assets/icons/start/route.svg";
import { Link } from "react-router-dom";

const StartScreen = ({ giftLink }) => {
  return (
    <section className={style.start}>
      <div className="container">
        <div className={`wrapper ${style.start__wrapper}`}>
          <Header giftLink={giftLink} />

          <div className={style.start__title}>
            <img src={title} alt="title" />
          </div>

          <ul>
            <li>
              <p>
                Станьте футбольным скаутом и покупайте игроков, подходящих под
                требования тренерского штаба
              </p>
            </li>

            <li>
              <p>
                В каждом раунде вам покажут 10 футболистов, лишь 5 из которых –
                нужные. Всего в игре 16 раундов.
              </p>
            </li>

            <li>
              <p>
                За правильный выбор дается +1 балл, за неправильный вычитается 1
                балл
              </p>
            </li>
          </ul>

          <div className={style.start__bottom}>
            <Link className={style.start__link} to="/task">
              Старт
            </Link>

            <p>
              Реклама 18+. Рекламодатель ООО «Фонкор». Erid:
              F7NfYUJCUneLt1tqhx9B По всем вопросам:{" "}
              <Link to="mailto:alarm24@sport24.ru">alarm24@sport24.ru</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartScreen;
