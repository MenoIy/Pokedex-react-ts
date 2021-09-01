import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import Pagination from "./components/Pagination";
import useFetch from "./hooks/useFetch";
import { getPokemonsListQuery } from "./pokeApi";
import PokemonModal from "./components/PokemonModal";

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
const MaxApiElements: number = 898;

const PokemonsList = ({ keyWord }: { keyWord: string }): JSX.Element => {
  const [selectedPokemon, setSelectedPokemon] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [elementsCount, setElementsCount] = useState<number>(MaxApiElements);
  const [pokeList, setPokeList] = useState<
    Array<{ name: string; url: string }>
  >([]);

  const { data, loading, error }: IUseFetch = useFetch(
    getPokemonsListQuery({
      offset: keyWord ? 0 : (currentPage - 1) * ElementsByPage,
      limit: keyWord ? 898 : ElementsByPage,
    })
  );

  const getIdFromUrl = (url: string): number => {
    const id = url.split("/");
    return parseInt(id[id.length - 2]);
  };

  useEffect(() => {
    if (!data) return;
    if (keyWord === "") {
      setElementsCount(898);
      setPokeList(data.results);
    } else {
      const results = data.results
        .slice(0, 898)
        .filter((pokemon) => pokemon.name.startsWith(keyWord));
      setElementsCount(results.length);
      setPokeList(
        results.slice(
          (currentPage - 1) * ElementsByPage,
          ElementsByPage * currentPage
        )
      );
    }
  }, [data, keyWord, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyWord]);

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
            {pokeList.map((pokemon, index) => {
              const id = getIdFromUrl(pokemon.url);
              console.log(pokeList);
              if (id > MaxApiElements) return null;
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
            ElementsCount={elementsCount}
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
