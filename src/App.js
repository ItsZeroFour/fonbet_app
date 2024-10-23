import { Route, Routes } from "react-router-dom";
import StartScreen from "./screens/start_screen/StartScreen";

function App() {
  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route path="/" element={<StartScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
