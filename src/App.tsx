import "./App.css";
import React from "react";
import Pokemon from "./components/Pokemon";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Pokemon />
    </div>
  );
};

export default App;
