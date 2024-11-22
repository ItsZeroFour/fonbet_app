import React from "react";
import style from "./style.module.scss";

const Achives = ({ registerLink, giftLink }) => {
  return (
    <div className={style.achives}>
      <div className="container">
        <div className={style.achives__wrapper}>
          <div className={style.achives__top}>
            <h1>Достижения</h1>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achives;
