import React from "react";
import style from "./style.module.scss";
import Header from "../../components/header/Header";
import logo from "../../assets/images/logo_2.svg";
import copy from "../../assets/icons/copy.svg";
import arrowReturn from "../../assets/icons/arrow-return.svg";
import { Link } from "react-router-dom";

const Final = () => {
  return (
    <div className={style.final}>
      <div className={`wrapper ${style.final__wrapper}`}>
        <Header />

        <div className={style.final__container}>
          <div className={style.final__main}>
            <h2>Ваш подарок</h2>

            <div className={style.final__image}>
              <img src={logo} alt="logo" />
              <div className={style.final__sum}>
                <h1>100 000 ₽</h1>
              </div>
            </div>

            <p>
              Введите промокод SCOUT24 в личном кабинете, если вы уже клиент
              FONBET.
            </p>

            <div className={style.final__promo}>
              <p>Scout24</p>
              <button
                onClick={() => {
                  navigator.сlipboard.writeText("Scout24");
                  alert("Успешно!");
                }}
              >
                <img src={copy} alt="copy" />
              </button>
            </div>
          </div>

          <div className={style.final__buttons}>
            <Link to="/">В личный кабинет</Link>
            <Link to="/">
              Вернуться в игру <img src={arrowReturn} alt="arrow return" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;
