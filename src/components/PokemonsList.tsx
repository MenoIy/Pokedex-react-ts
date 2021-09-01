import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
import { getPokemonsListQuery } from "../pokeApi";
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

const ElementsByPage: number = 20;
const ElementsCount: number = 898;

const PokemonsList = (): JSX.Element => {
  const [selectedPokemon, setSelectedPokemon] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, loading, error }: IUseFetch = useFetch(
    getPokemonsListQuery({
      offset: (currentPage - 1) * ElementsByPage,
      limit: ElementsByPage,
    })
  );

  useEffect((): void => {
    window.scroll(0, 0);
  }, [currentPage]);

  return (
    <>
      {error && <p>Oops something went wrong!</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <>
          <div className="pokemon__list">
            {data.results.map((pokemon, index) => {
              const id = index + 1 + (currentPage - 1) * ElementsByPage;
              if (id > ElementsCount) return null;
              return (
                <PokemonCard
                  key={index}
                  id={id}
                  name={pokemon.name}
                  onClick={setSelectedPokemon}
                />
              );
            })}
            {selectedPokemon !== -1 && (
              <PokemonModal id={selectedPokemon} onClose={setSelectedPokemon} />
            )}
          </div>
          <Pagination
            ElementsCount={ElementsCount}
            ElementsByPage={ElementsByPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default PokemonsList;
