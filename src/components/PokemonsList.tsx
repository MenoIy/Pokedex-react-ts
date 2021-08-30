import React from "react";
import Pokemon from "../components/Pokemon";
import useFetch from "../hooks/useFetch";
import { getPokemonsListQuery, getPokemonImgUrl } from "../pokeApi";

type IPokeData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

type IUseFetch = {
  data: IPokeData | null;
  loading: boolean;
  error: boolean;
};

const PokemonsList = (): JSX.Element => {
  const { data, loading, error }: IUseFetch = useFetch(getPokemonsListQuery());

  return (
    <>
      {error && <p>Error</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="pokemon__list">
          {data.results.map((pokemon, index) => (
            <Pokemon
              key={index}
              id={index}
              name={pokemon.name}
              img={getPokemonImgUrl(index + 1)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PokemonsList;
