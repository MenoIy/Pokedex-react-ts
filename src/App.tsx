import "./App.css";
import React, { useState } from "react";
import PokemonsListWithQuery from "./PokemonsList";

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
        className="search_input"
      />
      <PokemonsListWithQuery keyWord={toSearch} />
    </>
  );
};

export default App;
