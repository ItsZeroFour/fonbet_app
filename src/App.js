import { Route, Routes } from "react-router-dom";
import StartScreen from "./screens/start_screen/StartScreen";
import Rules from "./screens/rules/Rules";
import Task from "./screens/task/Task";
import Game from "./screens/game/Game";

function App() {
  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/task" element={<Task />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
