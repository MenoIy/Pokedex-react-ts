import "./App.css";
import React, { useState } from "react";
import PokemonsList from "./PokemonsList";

const App: React.FC = (): JSX.Element => {
  const [toSearch, setToSearch] = useState<string>("");

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setToSearch(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={toSearch}
        onChange={handelChange}
      />
      <PokemonsList keyWord={toSearch} />
    </>
  );
};

export default App;
