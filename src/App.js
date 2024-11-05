import { Route, Routes } from "react-router-dom";
import StartScreen from "./screens/start_screen/StartScreen";
import Rules from "./screens/rules/Rules";
import Task from "./screens/task/Task";
import Game from "./screens/game/Game";
import Final from "./screens/final/Final";
import { useEffect, useState } from "react";
import linkData from "./data/links.json";

function App() {
  const [giftLink, setGiftLink] = useState(
    "https://af-ru2e2e.com/click?offer_id=125&partner_id=11177&landing_id=4012&utm_medium=affiliate&web_master_id={web_master_id}&partner_click_id={partner_click_id}&sub_1={sport24}&sub_2={spec}&sub_3={scout}&sub_4={promo}&sub_5={source_1}"
  );
  const [registerLink, setRegisterLink] = useState(
    "https://af-ru2e2e.com/click?offer_id=125&partner_id=11177&landing_id=4019&utm_medium=affiliate&web_master_id={web_master_id}&partner_click_id={partner_click_id}&sub_1={sport24}&sub_2={spec}&sub_3={scout}&sub_4={promo}&sub_5={source_1}"
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const urlSourceParams = Array.from(urlParams.entries())
      .filter(([key]) => key.startsWith("utm_"))
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const linkInfo = linkData.find(
      (item) => item.sourceUrl === urlSourceParams
    );

    if (linkInfo) {
      setGiftLink(linkInfo.giftLink.replace("{sub_5}", linkInfo.sub5));
      setRegisterLink(linkInfo.registerLink.replace("{sub_5}", linkInfo.sub5));
    }
  }, []);

  console.log(giftLink, registerLink);

  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/task" element={<Task />} />
          <Route path="/game" element={<Game />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
