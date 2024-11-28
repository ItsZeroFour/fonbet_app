import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import footballers from "../../data/footballers.json";
import Header from "../../components/header/Header";
import { motion } from "framer-motion";
import audioCorrect from "../../assets/audios/true.mp3";
import audioUncorrect from "../../assets/audios/wrong.mp3";
import audioWin from "../../assets/audios/win_round.wav";
import audioLoose from "../../assets/audios/loose_round.wav";
import useSound from "use-sound";

const achievementsData = [
  {
    id: 1,
    title: "Наши парни",
    description: "Ответь 7 раз верно по российским футболистам",
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
    description: "Ответь 7 раз верно по футболистам старше 35 лет",
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

const Game = React.memo(({ giftLink, registerLink }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [playAudioCorrect] = useSound(audioCorrect);
  const [playAudioUncorrect] = useSound(audioUncorrect);
  const [playAudioWin] = useSound(audioWin);
  const [playAudioLoose] = useSound(audioLoose);

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
  const [rightSwipeCount, setRightSwipeCount] = useState(0);
  const [onRightSwipe, setOnRightSwipe] = useState(false);
  const [trueSwiperCount, setTrueSwiperCount] = useState(0);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [swipeText, setSwipeText] = useState("");
  const [footballerTextContent, setFootballerTextContent] = useState("");
  const [itemAchives, setItemAchives] = useState([]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [achives, setAchives] = useState([]);

  const [achive1List, setAchive1List] = useState(() => {
    const saved = localStorage.getItem("achive1List");
    return saved ? JSON.parse(saved) : [-1];
  });

  const [achive2List, setAchive2List] = useState(() => {
    const saved = localStorage.getItem("achive2List");
    return saved ? JSON.parse(saved) : [];
  });

  const [achive3List, setAchive3List] = useState(() => {
    const saved = localStorage.getItem("achive3List");
    return saved ? JSON.parse(saved) : [];
  });

  const [achive4List, setAchive4List] = useState(() => {
    const saved = localStorage.getItem("achive4List");
    return saved ? JSON.parse(saved) : [];
  });

  const [achive5List, setAchive5List] = useState(() => {
    const saved = localStorage.getItem("achive5List");
    return saved ? JSON.parse(saved) : [];
  });

  const [achive6List, setAchive6List] = useState(() => {
    const saved = localStorage.getItem("achive6List");
    return saved ? JSON.parse(saved) : [];
  });

  const [achive7List, setAchive7List] = useState(() => {
    const saved = localStorage.getItem("achive7List");
    return saved ? JSON.parse(saved) : [];
  });

  const [achive8List, setAchive8List] = useState(() => {
    const saved = localStorage.getItem("achive8List");
    return saved ? JSON.parse(saved) : [];
  });

  const [achive9List, setAchive9List] = useState(() => {
    const saved = localStorage.getItem("achive9List");
    return saved ? JSON.parse(saved) : [];
  });

  const [isSwiping, setIsSwiping] = useState(false);
  const dragRef = useRef(null);

  const animationFrameId = useRef(null);

  useEffect(() => {
    if (location.state?.score) {
      setScore(location.state.score);
      setIsEnd(true);
    }

    if (location.state?.array) {
      setCorrectChoosedImages(location.state.array);
      setIsEnd(true);
    }

    if (location.state?.shuffledFootballers) {
      setShuffledFootballers(location.state.shuffledFootballers);
    }

    if (location.state?.correctChoosedImages) {
      setCorrectChoosedImages(location.state.correctChoosedImages);
    }

    if (location.state?.score1) {
      setScore(location.state.score1);
    }

    if (location.state?.currentIndex) {
      setCurrentIndex(location.state.currentIndex);
    }
  }, [location]);

  useEffect(() => {
    const indexParam = searchParams.get("index");
    const parsedIndex = parseInt(indexParam, 10);

    if (
      !isNaN(parsedIndex) &&
      parsedIndex >= 0 &&
      parsedIndex < footballers.items.length
    ) {
      setIndex(parsedIndex);
    } else {
      navigate("/final");
    }
  }, [searchParams]);

  useEffect(() => {
    setImageLoaded(false);
    setTimeout(() => {
      setImageLoaded(true);
    }, 100);
  }, []);

  useEffect(() => {
    localStorage.setItem("achive1List", JSON.stringify(achive1List));

    if (
      achive1List.length >= 5 &&
      !localStorage.getItem("messageShownArray1")
    ) {
      localStorage.setItem("messageShownArray1", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 1,
        },
      ]);
    }
  }, [achive1List]);

  useEffect(() => {
    localStorage.setItem("achive2List", JSON.stringify(achive2List));

    if (
      achive2List.length >= 5 &&
      !localStorage.getItem("messageShownArray2")
    ) {
      localStorage.setItem("messageShownArray2", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 2,
        },
      ]);
    }
  }, [achive2List]);

  useEffect(() => {
    localStorage.setItem("achive3List", JSON.stringify(achive3List));

    if (
      achive3List.length >= 5 &&
      !localStorage.getItem("messageShownArray3")
    ) {
      localStorage.setItem("messageShownArray3", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 3,
        },
      ]);
    }
  }, [achive3List]);

  useEffect(() => {
    localStorage.setItem("achive4List", JSON.stringify(achive4List));

    if (
      achive4List.length >= 5 &&
      !localStorage.getItem("messageShownArray4")
    ) {
      localStorage.setItem("messageShownArray4", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 4,
        },
      ]);
    }
  }, [achive4List]);

  useEffect(() => {
    localStorage.setItem("achive5List", JSON.stringify(achive5List));

    if (
      achive5List.length >= 5 &&
      !localStorage.getItem("messageShownArray5")
    ) {
      localStorage.setItem("messageShownArray5", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 5,
        },
      ]);
    }
  }, [achive5List]);

  useEffect(() => {
    localStorage.setItem("achive6List", JSON.stringify(achive6List));

    if (
      achive6List.length >= 5 &&
      !localStorage.getItem("messageShownArray6")
    ) {
      localStorage.setItem("messageShownArray6", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 6,
        },
      ]);
    }
  }, [achive6List]);

  useEffect(() => {
    localStorage.setItem("achive7List", JSON.stringify(achive7List));

    if (
      achive7List.length >= 7 &&
      !localStorage.getItem("messageShownArray7")
    ) {
      localStorage.setItem("messageShownArray7", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 7,
        },
      ]);
    }
  }, [achive7List]);

  useEffect(() => {
    localStorage.setItem("achive8List", JSON.stringify(achive8List));

    if (
      achive8List.length >= 5 &&
      !localStorage.getItem("messageShownArray8")
    ) {
      localStorage.setItem("messageShownArray8", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 8,
        },
      ]);
    }
  }, [achive8List]);

  useEffect(() => {
    localStorage.setItem("achive9List", JSON.stringify(achive9List));

    if (
      achive9List.length >= 5 &&
      !localStorage.getItem("messageShownArray9")
    ) {
      localStorage.setItem("messageShownArray9", "true");
      setAchives((prevList) => [
        ...prevList,
        {
          id: 9,
        },
      ]);
    }
  }, [achive9List]);

  const currentChapter = index < 4 ? 1 : index < 8 ? 2 : index < 12 ? 3 : 4;

  useEffect(() => {
    if (index === 0 && window.ym) {
      window.ym(98751165, "reachGoal", "start----interaction");
    }
  }, []);

  const item = footballers?.items[index];

  function checkIsEnd() {
    if (!(achives.length > 0 && currentMessageIndex < achives.length)) {
      if (showMessage) {
        if (isCorrectChoose >= item?.footballers.length) {
          setTimeout(() => {
            setIsEnd(true);
          }, 4000);
        } else if (currentIndex + 1 > item?.footballers.length) {
          setTimeout(() => {
            setIsEnd(true);
          }, 4000);
        }
      } else {
        if (isCorrectChoose >= item?.footballers.length) {
          setIsEnd(true);
        } else if (currentIndex + 1 > item?.footballers.length) {
          setIsEnd(true);
        }
      }
    }
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("offVoice")) === false) {
      if (isEnd && currentChapter === 1 && score >= 2) {
        playAudioWin();
      } else if (isEnd && currentChapter === 2 && score >= 3) {
        playAudioWin();
      } else if (isEnd && currentChapter === 3 && score >= 4) {
        playAudioWin();
      } else if (isEnd && currentChapter === 3 && score >= 5) {
        playAudioWin();
      }

      if (isEnd && currentChapter === 1 && score < 2) {
        playAudioLoose();
      } else if (isEnd && currentChapter === 2 && score < 3) {
        playAudioLoose();
      } else if (isEnd && currentChapter === 3 && score < 4) {
        playAudioLoose();
      } else if (isEnd && currentChapter === 3 && score < 5) {
        playAudioLoose();
      }
    }
  }, [isEnd]);

  useEffect(() => {
    checkIsEnd();
  }, [currentIndex]);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (item?.footballers && !location.state?.shuffledFootballers) {
      setShuffledFootballers(shuffle([...item.footballers]));
    }
  }, [item?.footballers]);

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const preloadNextImage = (index) => {
    if (shuffledFootballers[index + 1]?.image) {
      const img = new Image();
      img.src = require(`../../assets/images/footballers/${
        shuffledFootballers[index + 1].image
      }`);
    }
  };

  useEffect(() => {
    preloadNextImage(currentIndex);
  }, [currentIndex]);

  function contains(arr, elem) {
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
          return true;
        }
      }
      return false;
    }
  }

  const swiped = (dir, isCorrect) => {
    if (!shuffledFootballers[currentIndex]) return;

    const footballerText = shuffledFootballers[currentIndex]?.text;
    setFootballerTextContent(footballerText);

    if (dir === "left" && !isCorrect) {
      setIsCorrectChoose(true);
      setRightSwipeCount((prevCount) => prevCount + 1);
      setScore((prevScore) => prevScore + 1);
      if (JSON.parse(localStorage.getItem("offVoice")) === false) {
        playAudioCorrect();
      }
      setSwipeText("Этот игрок был вам не нужен");

      if (contains(itemAchives, 1)) {
        if (!contains(achive1List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive1List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 2)) {
        if (!contains(achive2List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive2List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 3)) {
        if (!contains(achive3List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive3List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 4)) {
        if (!contains(achive4List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive4List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 5)) {
        if (!contains(achive5List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive5List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 6)) {
        if (!contains(achive6List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive6List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 7)) {
        if (!contains(achive7List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive7List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 8)) {
        if (!contains(achive8List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive8List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 9)) {
        if (!contains(achive9List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive9List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
    } else if (dir === "right" && isCorrect) {
      setIsCorrectChoose(true);
      setScore((prevScore) => prevScore + 1);
      setIsCorrectChoosed((prev) => prev + 1);
      setRightSwipeCount((prevCount) => prevCount + 1);
      setCorrectChoosedImages((prevImages) => [
        ...prevImages,
        shuffledFootballers[currentIndex].image,
      ]);
      if (JSON.parse(localStorage.getItem("offVoice")) === false) {
        playAudioCorrect();
      }
      setSwipeText("Вы приобрели нужного игрока!");

      if (contains(itemAchives, 1)) {
        if (!contains(achive1List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive1List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 2)) {
        if (!contains(achive2List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive2List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 3)) {
        if (!contains(achive3List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive3List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 4)) {
        if (!contains(achive4List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive4List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 5)) {
        if (!contains(achive5List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive5List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 6)) {
        if (!contains(achive6List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive6List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 7)) {
        if (!contains(achive7List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive7List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 8)) {
        if (!contains(achive8List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive8List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
      if (contains(itemAchives, 9)) {
        if (!contains(achive9List, shuffledFootballers[currentIndex].iIndex)) {
          setAchive9List((prevList) => [
            ...prevList,
            shuffledFootballers[currentIndex].iIndex,
          ]);
        }
      }
    } else if (dir === "left" && isCorrect) {
      setIsCorrectChoose(false);
      setScore((prevScore) => prevScore - 1);
      if (JSON.parse(localStorage.getItem("offVoice")) === false) {
        playAudioUncorrect();
      }
      setSwipeText("Этот игрок был вам нужен");
    } else {
      setIsCorrectChoose(false);
      setScore((prevScore) => prevScore - 1);
      if (JSON.parse(localStorage.getItem("offVoice")) === false) {
        playAudioUncorrect();
      }
      setSwipeText("Вы приобрели ненужного игрока!");
    }

    if (dir === "right") {
      setTrueSwiperCount((prevCount) => prevCount + 1);
    }

    checkIsEnd();
    setShowMessage(true);

    if (
      !(index === 0 && (rightSwipeCount !== 1 || rightSwipeCount !== 3)) &&
      !(index > 0 && index <= 7 && rightSwipeCount !== 1)
    ) {
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    } else {
      setOnRightSwipe(true);
    }

    const x = dir === "left" ? -1000 : 1000;
    const card = document.querySelector(`.${style.card}`);

    if (card) {
      card.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${x}px)` }],
        {
          duration: 0,
          easing: "ease-in-out",
          fill: "forwards",
        }
      ).onfinish = () => {
        setSwiping(false);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      };
    }
  };

  const handleSwipe = (direction, isCorrect) => {
    if (
      !(index === 0 && (rightSwipeCount !== 1 || rightSwipeCount !== 3)) &&
      !(index > 0 && index <= 7 && rightSwipeCount !== 1)
    ) {
      setTimeout(() => {
        setSwiping(true);
      }, 4000);
    }

    swiped(direction, isCorrect);
    setDragX(0);
  };

  useEffect(() => {
    // Сбрасываем transform при каждом новом слайде
    if (dragRef.current) {
      dragRef.current.style.transform = "translate3d(0, 0, 0)";
    }
    setDragX(0);
  }, [currentIndex]);

  const handleDrag = (offsetX) => {
    // Ограничиваем движение карточки
    const maxSwipeDistance = 40;
    const limitedX = Math.min(
      Math.max(offsetX, -maxSwipeDistance),
      maxSwipeDistance
    );
    setDragX(limitedX);

    // Прямой доступ к DOM для улучшения производительности
    if (dragRef.current) {
      dragRef.current.style.transform = `translate3d(${limitedX}px, 0, 0) rotate(${
        limitedX / 15
      }deg)`;
    }
  };

  const handleDragEnd = (offsetX) => {
    const swipeThreshold = 150; // Порог для завершения свайпа
    const direction = offsetX > 0 ? "right" : "left";

    if (Math.abs(offsetX) > swipeThreshold) {
      handleSwipe(direction, shuffledFootballers[currentIndex]?.isCorrect);
    } else {
      // Возврат карточки
      if (dragRef.current) {
        dragRef.current.style.transition = "transform 0.3s ease-out";
        dragRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      setDragX(0);
    }
  };

  const onPointerMove = (e) => {
    if (!isSwiping) return;
    const offsetX = e.clientX - dragRef.current.startX;
    handleDrag(offsetX);
  };

  const onPointerUp = (e) => {
    setIsSwiping(false);
    const offsetX = e.clientX - dragRef.current.startX;
    handleDragEnd(offsetX);
  };

  const onPointerDown = (e) => {
    setIsSwiping(true);
    dragRef.current.startX = e.clientX;
    if (dragRef.current) {
      dragRef.current.style.transition = "none"; // Убираем инерцию для drag
    }
  };

  useEffect(() => {
    if (
      currentIndex &&
      currentIndex >= 0 &&
      currentIndex < shuffledFootballers.length &&
      shuffledFootballers &&
      shuffledFootballers.length !== 0
    ) {
      const item = shuffledFootballers[currentIndex].achive;
      setItemAchives(item);
    }
  }, [currentIndex, shuffledFootballers, item?.footballers]);

  const handleNextMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    console.log(1);

    if (!(achives.length > 0 && currentMessageIndex < achives.length)) {
      checkIsEnd();
      console.log(2);
    }
  }, [achives, currentMessageIndex]);

  const buttonVariants = {
    initial: { backgroundColor: "transparent", color: "#fff" },
    animate: { backgroundColor: "#e80024", color: "#fff" },
    whileTap: { backgroundColor: "#fff", color: "#e80024" },
  };

  const buttonVariants2 = {
    initial: { backgroundColor: "transparent", color: "#fff" },
    animate: { backgroundColor: "#fff", fill: "#e80024" },
    whileTap: { backgroundColor: "#e80024", color: "#e80024" },
  };

  return (
    <div className={style.game}>
      <div className={`wrapper ${style.game__wrapper}`}>
        <Header
          giftLink={giftLink}
          index={index}
          currentChapter={currentChapter}
          isGameRef={true}
          currentIndex={currentIndex}
          shuffledFootballers={shuffledFootballers}
          score={score}
          correctChoosedImages={correctChoosedImages}
        />

        {!isEnd ? (
          <div className={style.game__container}>
            {item && (
              <React.Fragment>
                {!(
                  index === 0 &&
                  onRightSwipe &&
                  (rightSwipeCount === 1 || rightSwipeCount === 3)
                ) && (
                  <React.Fragment>
                    {!(
                      achives.length > 0 && currentMessageIndex < achives.length
                    ) && (
                      <React.Fragment>
                        <div className={style.game__task}>
                          <div className={style.game__task__index}>
                            {item.index}
                          </div>
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
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}

                {!showMessage &&
                  achives.length > 0 &&
                  currentMessageIndex < achives.length && (
                    <div className={style.game__achive}>
                      <div className={style.game__achive__container}>
                        <h2>Класс!</h2>

                        <img
                          src={require(`../../assets/achives/${achives[currentMessageIndex].id}.png`)}
                          alt="achive"
                        />
                        <p>
                          Вы получили ачивку <br /> "
                          {
                            achievementsData.filter(
                              ({ id }) => id === achives[currentMessageIndex].id
                            )[0].title
                          }
                          "
                        </p>
                      </div>

                      <h4>
                        Вам подарок от FONBET – <span>до 15 000 ₽</span>
                      </h4>
                      <p>
                        Предоставляется в виде бонусов (Фрибетов), подробнее в{" "}
                        <Link
                          style={{ textDecoration: "underline" }}
                          to="https://fon.bet/pages/scout"
                          target="_blank"
                        >
                          правилах игры.
                        </Link>
                      </p>

                      <div className={style.game__achive__buttons}>
                        <button onClick={handleNextMessage}>
                          Играть дальше
                        </button>

                        <Link
                          onClick={async () => {
                            if (window.ym) {
                              await window.ym(
                                98751165,
                                "reachGoal",
                                `achivka_-${achives[currentMessageIndex].id}---conversion`
                              );
                            }
                          }}
                          to={giftLink}
                          target="_blank"
                        >
                          Забрать бонус
                        </Link>
                      </div>
                    </div>
                  )}

                <div className={style.game__cards__container}>
                  {(showMessage &&
                    index === 0 &&
                    (rightSwipeCount === 1 || rightSwipeCount === 3) &&
                    isCorrectChoose) ||
                  (showMessage &&
                    index > 0 &&
                    index <= 7 &&
                    rightSwipeCount === 1) ? (
                    <div className={style.game__cards__correct}>
                      <h3>Верно!</h3>

                      <div className={style.game__banner}>
                        <h2>Ваш подарок от FONBET!</h2>

                        <div className={style.game__banner__cupon}>
                          <p>до 15 000 ₽*</p>
                        </div>

                        <p>
                          Пройдите игру до конца, чтобы принять участие в
                          розыгрыше 100 000 ₽ фрибетами.
                        </p>

                        <Link
                          className={style.game__banner__link_1}
                          onClick={async () => {
                            if (window.ym) {
                              await window.ym(
                                98751165,
                                "reachGoal",
                                `offer--${
                                  index === 0
                                    ? rightSwipeCount === 1
                                      ? 1
                                      : rightSwipeCount === 3 && 2
                                    : index
                                }---conversion`
                              );
                            }
                          }}
                          to={giftLink}
                          target="_blank"
                        >
                          Забрать подарок
                        </Link>
                      </div>

                      <div className={style.game__cards__correct__bottom}>
                        <button
                          onClick={async () => {
                            if (window.ym) {
                              await window.ym(
                                98751165,
                                "reachGoal",
                                `offer--${
                                  index === 0
                                    ? rightSwipeCount === 1
                                      ? 1
                                      : rightSwipeCount === 3 && 2
                                    : index
                                }--play--interaction`
                              );
                            }

                            setSwiping(false);
                            setShowMessage(false);
                            setOnRightSwipe(false);
                          }}
                        >
                          Играть дальше
                        </button>

                        <p>
                          *Предоставляется в виде бонусов (Фрибетов), подробнее
                          в{" "}
                          <Link
                            style={{ textDecoration: "underline" }}
                            to="https://fon.bet/pages/scout"
                            target="_blank"
                          >
                            правилах игры.
                          </Link>
                        </p>
                      </div>
                    </div>
                  ) : (
                    showMessage &&
                    index === 0 &&
                    (rightSwipeCount === 1 || rightSwipeCount === 3) && (
                      <div
                        className={`${style.message} ${style.message__index}`}
                      >
                        <p>Неверно</p>

                        <div className={style.message__container}>
                          <h3>{swipeText}</h3>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {footballerTextContent}
                          </motion.p>
                        </div>

                        <p style={{ opacity: 0 }}>
                          {setTimeout(() => {
                            setSwiping(false);
                            setShowMessage(false);
                            setOnRightSwipe(false);
                          }, 4000)}
                        </p>
                      </div>
                    )
                  )}

                  {showMessage &&
                  rightSwipeCount !== 1 &&
                  rightSwipeCount !== 3 &&
                  index === 0 ? (
                    <div className={style.message}>
                      {isCorrectChoose ? (
                        <div
                          className={`${style.message} ${style.message__index} ${style.message__correct}`}
                        >
                          <p>Верно!</p>

                          <div className={style.message__container}>
                            <h3>{swipeText}</h3>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {footballerTextContent}
                            </motion.p>
                          </div>

                          <p style={{ opacity: 0 }}>
                            {setTimeout(() => {
                              setSwiping(false);
                              setShowMessage(false);
                              setOnRightSwipe(false);
                            }, 4000)}
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`${style.message} ${style.message__index}`}
                        >
                          <p>Неверно</p>

                          <div className={style.message__container}>
                            <h3>{swipeText}</h3>
                            <p>{footballerTextContent}</p>
                          </div>

                          <p style={{ opacity: 0 }}>
                            {setTimeout(() => {
                              setSwiping(false);
                              setShowMessage(false);
                              setOnRightSwipe(false);
                            }, 4000)}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    showMessage &&
                    index !== 0 &&
                    !(index > 0 && index <= 7 && rightSwipeCount === 1) && (
                      <div className={style.message}>
                        {isCorrectChoose ? (
                          <div
                            className={`${style.message} ${style.message__index} ${style.message__correct}`}
                          >
                            <p>Верно!</p>

                            <div className={style.message__container}>
                              <h3>{swipeText}</h3>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {footballerTextContent}
                              </motion.p>
                            </div>

                            <p style={{ opacity: 0 }}>
                              {setTimeout(() => {
                                setSwiping(false);
                                setShowMessage(false);
                                setOnRightSwipe(false);
                              }, 4000)}
                            </p>
                          </div>
                        ) : (
                          <div
                            className={`${style.message} ${style.message__index}`}
                          >
                            <p>Неверно</p>

                            <div className={style.message__container}>
                              <h3>{swipeText}</h3>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {footballerTextContent}
                              </motion.p>
                            </div>

                            <p style={{ opacity: 0 }}>
                              {setTimeout(() => {
                                setSwiping(false);
                                setShowMessage(false);
                                setOnRightSwipe(false);
                              }, 4000)}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  )}

                  {!(
                    achives.length > 0 && currentMessageIndex < achives.length
                  ) && (
                    <React.Fragment>
                      {!showMessage &&
                        currentIndex < shuffledFootballers.length &&
                        shuffledFootballers.length > 0 && (
                          <div
                            className={style.cardWrapper}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            onPointerLeave={onPointerUp}
                          >
                            <div
                              ref={dragRef}
                              className={`${style.card} ${
                                swiping ? style.swipeActive : ""
                              } ${
                                index === 0 &&
                                currentIndex === 0 &&
                                style.card__animate
                              } ${index === 3 && style.card__sec} ${
                                index === 4 && style.card__thrd
                              }`}
                              style={{
                                willChange: "transform",
                                transform: `translate3d(${dragX}px, 0, 0) rotate(${
                                  dragX / 15
                                }deg)`,
                              }}
                            >
                              <img
                                src={require(`../../assets/images/footballers/${shuffledFootballers[currentIndex].image}`)}
                                alt="card"
                              />
                              <h3>{shuffledFootballers[currentIndex]?.name}</h3>
                            </div>
                          </div>
                        )}
                    </React.Fragment>
                  )}
                </div>

                {!(
                  achives.length > 0 && currentMessageIndex < achives.length
                ) &&
                  !showMessage && (
                    <div
                      className={`${style.game__cards__nav} ${
                        index === 0 &&
                        currentIndex === 0 &&
                        style.game__cards__nav__animate
                      }`}
                    >
                      <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="whileTap"
                        disabled={swiping}
                        onClick={() => {
                          setDragX(0);
                          handleSwipe(
                            "left",
                            shuffledFootballers[currentIndex]?.isCorrect
                          );
                        }}
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

                      <motion.button
                        variants={buttonVariants2}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="whileTap"
                        disabled={swiping}
                        onClick={() => {
                          setDragX(0);
                          handleSwipe(
                            "right",
                            shuffledFootballers[currentIndex]?.isCorrect
                          );
                        }}
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
                  )}
              </React.Fragment>
            )}
          </div>
        ) : (
          <React.Fragment>
            {
              <div className={style.game__final}>
                <div className={style.game__total}>
                  <h1>
                    {index === 15 && score >= 5 ? (
                      <>Игра пройдена!</>
                    ) : (
                      <>
                        {currentChapter === 1
                          ? score >= 2
                            ? "Раунд пройден!"
                            : "Вы проиграли :("
                          : currentChapter === 2
                          ? score >= 3
                            ? "Раунд пройден!"
                            : "Вы проиграли :("
                          : currentChapter === 3
                          ? score >= 4
                            ? "Раунд пройден!"
                            : "Вы проиграли :("
                          : score >= 5
                          ? "Раунд пройден!"
                          : "Вы проиграли :("}
                      </>
                    )}
                  </h1>

                  <div>
                    <p>
                      {correctChoosedImages.length}/
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
                  {score >=
                  (currentChapter === 1
                    ? 2
                    : currentChapter === 2
                    ? 3
                    : currentChapter === 3
                    ? 4
                    : 5) ? (
                    <>
                      Поздравляем, скаут! <br /> Вот кого из нужных игроков вы
                      взяли в команду:
                    </>
                  ) : (
                    <>Вот кого из нужных игроков вы взяли в команду:</>
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
                              correctChoosedImages.includes(image) && {
                                opacity: 1,
                              }
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

                {score >=
                (currentChapter === 1
                  ? 2
                  : currentChapter === 2
                  ? 3
                  : currentChapter === 3
                  ? 4
                  : 5) ? (
                  <div
                    className={`${style.game__banner} ${style.game__banner__2}`}
                  >
                    <h2>
                      Ваш подарок <br /> от FONBET!
                    </h2>

                    {/* <div className={style.game__banner__cupon}>
                            {/* <div className={style.game__banner__cupon}>
                              <p>100 000 ₽*</p>
                            </div> */}

                    <p>
                      Регистрируйтесь по ссылке, получите <br /> подарок до 15
                      000 ₽ и примите участие <br /> в розыгрыше 100 000 ₽ !
                    </p>

                    <Link
                      className={style.game__banner__link_1}
                      onClick={() => {
                        if (window.ym) {
                          window.ym(
                            98751165,
                            "reachGoal",
                            `final--${index + 1}---conversion`
                          );
                        }
                      }}
                      to={registerLink}
                      target="_blank"
                    >
                      Регистрация
                    </Link>

                    {/* <div className={style.game__banner__link__container}>
                              <button
                                className={style.game__banner__link_2}
                                onClick={handleNavigateToConversionPage}
                              >
                                Я уже с FONBET <img src={arrowRight} alt="arrow right" />
                              </button>
                            </div> */}
                  </div>
                ) : (
                  <div className={style.game__banner}>
                    <h2>Вам подарок от FONBET!</h2>

                    <div className={style.game__banner__cupon}>
                      <p>до 15 000 ₽*</p>
                    </div>

                    <p>
                      Пройдите раунд до конца, чтобы принять участие в розыгрыше{" "}
                      <span>100 000 ₽ фрибетами.</span>
                    </p>

                    <Link
                      className={style.game__banner__link_1}
                      onClick={async () => {
                        if (window.ym) {
                          await window.ym(
                            98751165,
                            "reachGoal",
                            "offer--10---conversion"
                          );
                        }
                      }}
                      to={giftLink}
                      target="_blank"
                    >
                      Забрать подарок
                    </Link>
                  </div>
                )}

                {score >=
                (currentChapter === 1
                  ? 2
                  : currentChapter === 2
                  ? 3
                  : currentChapter === 3
                  ? 4
                  : 5) ? (
                  <>
                    {index !== 15 && (
                      <button
                        onClick={async () => {
                          if (window.ym) {
                            await window.ym(
                              98751165,
                              "reachGoal",
                              `final--${index + 1}--play--interaction`
                            );
                          }

                          if (index === 3 || index === 7 || index === 11) {
                            navigate("/task", {
                              state: { index: index + 1, currentChapter },
                            });
                          } else {
                            navigate("/task", {
                              state: { index: index + 1, currentChapter },
                            });
                          }
                        }}
                      >
                        Играть дальше
                      </button>
                    )}
                  </>
                ) : (
                  <Link
                    to={`/game?index=${index}`}
                    onClick={async () => {
                      if (window.ym) {
                        await window.ym(
                          98751165,
                          "reachGoal",
                          "died-play----interaction"
                        );
                      }

                      window.location.href = `/game?index=${index}`;
                    }}
                  >
                    Играть снова
                  </Link>
                )}

                <p>
                  *Предоставляется в виде бонусов (Фрибетов), подробнее в{" "}
                  <Link
                    style={{ textDecoration: "underline" }}
                    to="https://fon.bet/pages/scout"
                    target="_blank"
                  >
                    правилах игры.
                  </Link>
                </p>
              </div>
            }
          </React.Fragment>
        )}
      </div>
    </div>
  );
});

export default Game;
