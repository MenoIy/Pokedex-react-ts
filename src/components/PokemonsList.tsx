import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import useFetch from "../hooks/useFetch";
import { getPokemonsListQuery, getPokemonImgUrl } from "../pokeApi";
import PokemonModal from "./PokemonModal";

type PokeData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

type IUseFetch = {
  data: PokeData | null;
  loading: boolean;
  error: boolean;
};

const PokemonsList = (): JSX.Element => {
  const { data, loading, error }: IUseFetch = useFetch(getPokemonsListQuery());
  const [selectedPokemon, setSelectedPokemon] = useState<number>(-1);

  return (
    <>
      {error && <p>Error</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="pokemon__list">
          {data.results.map((pokemon, index) => (
            <div key={index} onClick={() => setSelectedPokemon(index + 1)}>
              <PokemonCard
                key={index}
                id={index + 1}
                name={pokemon.name}
                img={getPokemonImgUrl(index + 1)}
              />
            </div>
          ))}
          {selectedPokemon !== -1 && (
            <PokemonModal id={selectedPokemon} onClose={setSelectedPokemon} />
          )}
        </div>
      )}
    </>
  );
};

export default PokemonsList;
