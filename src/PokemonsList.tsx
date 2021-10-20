import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import Pagination from "./components/Pagination";
import { getPokemonsListQuery } from "./pokeApi";
import PokemonModal from "./components/PokemonModal";

import {useQuery, QueryClient, QueryClientProvider} from 'react-query'


type PokeData = {
  name : string,
  url : string
}

const ElementsByPage: number = 20;
const MaxApiElements: number = 898;

const getQueryKey = (keyWord: string, currentPage: number): {offset : number, limit : number} => {
  const limit = keyWord ? MaxApiElements :  ElementsByPage;
  const offset = keyWord ? 0 : (currentPage - 1) * ElementsByPage;

  return {offset:offset, limit:limit};
};

const queryClient = new QueryClient();


const PokemonsListWithQuery = ({ keyWord }: { keyWord: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonsList keyWord={keyWord} />
    </QueryClientProvider>
  );
};


const PokemonsList = ({ keyWord}: { keyWord: string }): JSX.Element => {
  
  const [selectedPokemon, setSelectedPokemon] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchPokemons = async ({queryKey} : any) => {
    const [, {currentPage, keyWord}] = queryKey;
    const { offset, limit } = getQueryKey(keyWord, currentPage);
    const url = getPokemonsListQuery({offset, limit});
    const response = await fetch(url);
    const data = await response.json();

    if (keyWord === "") return data.results;
    return data.results.filter((pokemon : PokeData, index : number) =>  pokemon.name.startsWith(keyWord) && index <= MaxApiElements);
  }

  const getIdFromUrl = (url: string): number => {
    const id = url.split("/");
    return parseInt(id[id.length - 2]);
  };

  const {data, isLoading, isError} =  useQuery(['getList', {currentPage, keyWord}], fetchPokemons);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyWord]);

  useEffect((): void => {
    window.scroll(0, 0);
  }, [currentPage]);

  return (
    <>
      {isError && <p>Oops something went wrong!</p>}
      {isLoading && <p>Loading...</p>}
      {data && (
        <>
          <div className="pokemon__list">
            {data.map((pokemon : PokeData, index : number) => {
              const id = getIdFromUrl(pokemon.url);
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
            ElementsCount={keyWord ? data.length : MaxApiElements}
            ElementsByPage={ElementsByPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};



export default PokemonsListWithQuery;
