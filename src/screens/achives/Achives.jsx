import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Header from "../../components/header/Header";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const achievementsData = [
  {
    id: 1,
    title: "Наши парни",
    description: "Ответь 5 раз верно по российским футболистам",
  },
  {
    id: 2,
    title: "Кудесники мяча",
    description: "Ответь 5 раз верно по бразильским футболистам",
  },
  {
    id: 3,
    title: "Золото России",
    description: "Ответь 5 раз верно по выигрывавшим РПЛ футболистам",
  },
  {
    id: 4,
    title: "Победители ЛЧ",
    description: "Ответь 5 раз верно по выигрывавшим ЛЧ футболистам",
  },
  {
    id: 5,
    title: "Чемпионы мира",
    description: "Ответь 5 раз верно по выигрывавшим ЧМ футболистам",
  },
  {
    id: 6,
    title: "Чемпионы Европы",
    description: "Ответь 5 раз верно по выигрывавшим Евро футболистам",
  },
  {
    id: 7,
    title: "Ветераны",
    description: "Ответь 5 раз верно по футболистам старше 35 лет",
  },
  {
    id: 8,
    title: "Молодежка",
    description: "Ответь 5 раз верно по футболистам младше 21 года",
  },
  {
    id: 9,
    title: "FONBET",
    description: "Ответь 5 раз верно по футболистам из клубов-партнеров FONBET",
  },
];

const Achives = ({ registerLink, giftLink }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const [achievements, setAchievements] = useState(
    Array(achievementsData.length).fill(false)
  );

  useEffect(() => {
    const updatedAchievements = achievements.map((_, index) => {
      let achiveList;
      try {
        achiveList = JSON.parse(localStorage.getItem(`achive${index + 1}List`));
      } catch (error) {
        console.error("Ошибка при парсинге JSON:", error);
        achiveList = null;
      }

      const minLength = index === 0 ? 7 : 5;
      return (
        achiveList &&
        Array.isArray(achiveList) &&
        achiveList.length >= minLength
      );
    });
    setAchievements(updatedAchievements);
  }, []);

  const goBack = () => {
    if (location.state?.isGameRef) {
      navigate(`/game?index=${searchParams.get("index")}`, {
        state: {
          score1: JSON.parse(localStorage.getItem("score1")),
          shuffledFootballers: JSON.parse(
            localStorage.getItem("shuffledFootballers1")
          ),
          currentIndex: JSON.parse(localStorage.getItem("currentIndex")),
          correctChoosedImages: JSON.parse(
            localStorage.getItem("correctChoosedImages")
          ),
        },
      });
    } else {
      navigate(-1);
    }
  };

  console.log(achievements);

  return (
    <div className={style.achives}>
      <div className={`wrapper ${style.achives__wrapper}`}>
        <Header giftLink={giftLink} />
        <div className={style.achives__container}>
          <div className={style.achives__top}>
            <h1>Достижения</h1>
            <button onClick={goBack} />
          </div>

          <ul>
            {achievementsData.map((achive, index) => (
              <li key={achive.id}>
                <img
                  src={require(`../../assets/achives/${achive.id}.png`)}
                  style={{
                    filter: achievements[index]
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                  }}
                  width={59}
                  height="auto"
                  alt={`achive ${achive.id}`}
                />
                <div>
                  <h3>{achive.title}</h3>
                  <p>{achive.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Achives;
