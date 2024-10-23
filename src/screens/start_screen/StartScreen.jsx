import React from "react";
import style from "./style.module.scss";
import Head from "../../components/head/Head";

const StartScreen = () => {
  return (
    <section className={style.start}>
      <div className="container">
        <div className={`wrapper ${style.start__wrapper}`}>
          <Head />
        </div>
      </div>
    </section>
  );
};

export default StartScreen;
