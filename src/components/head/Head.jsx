import React from "react";
import style from "./style.module.scss";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import gift from "../../assets/icons/gift.svg";
import voice from "../../assets/icons/voice.svg";

const Head = () => {
  return (
    <header className={style.head}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <div className={style.head__buttons}>
        <button>
          <img src={gift} alt="gift" />
        </button>

        <button>
          <img src={voice} alt="voice" />
        </button>
      </div>
    </header>
  );
};

export default Head;
