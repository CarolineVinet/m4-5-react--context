import React from "react";
import ReactDOM from "react-dom";
import GameProvider from "./components/GameContext";
import App from "./components/App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  rootElement
);
