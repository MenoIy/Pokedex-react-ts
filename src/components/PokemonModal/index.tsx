import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { getPokemonInfoQuery, getPokemonImgUrl } from "../../pokeApi";
import StatEntry from "../StatEntry";
import "./style.css";

type PekemonStats = {
  hp: number;
  atk: number;
  def: number;
  speed: number;
  sp_atk: number;
  sp_def: number;
};

type PokeData = {
  id: number;
  name: string;
  types: Array<string>;
  height: number;
  weight: number;
  image: string;
  stats: PekemonStats;
};

const PokemonModal = ({ id }: { id: number }): JSX.Element => {
  const { data, loading, error } = useFetch(getPokemonInfoQuery(id));
  const [pokeData, setPokeData] = useState<null | PokeData>(null);

  useEffect((): void => {
    if (!data) return;

    setPokeData({
      id: data.id,
      name: data.name,
      types: data.types.map((type: any) => type.type.name),
      height: data.height / 10,
      weight: data.weight / 10,
      image: getPokemonImgUrl(id),
      stats: {
        hp: data.stats[0].base_stat,
        atk: data.stats[1].base_stat,
        def: data.stats[2].base_stat,
        sp_atk: data.stats[3].base_stat,
        sp_def: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
    });
  }, [data, id]);

  return (
    <div className="pokemon-modal">
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {pokeData && !loading && (
        <>
          <div className="pokemon-name">{pokeData.name}</div>
          <div className="pokemon-img-container">
            <img src={pokeData.image} alt={pokeData.name} />
          </div>
          <div className="pokemon-types">
            {pokeData.types.map((type: string, index: number) => (
              <div key={index}>{type}</div>
            ))}
          </div>
          <div className="pokemon-stats">
            <StatEntry name="ATK" value={pokeData.stats.atk} />
            <StatEntry name="DEF" value={pokeData.stats.def} />
            <StatEntry name="SP-ATK" value={pokeData.stats.sp_atk} />
            <StatEntry name="SP-DEF" value={pokeData.stats.sp_def} />
            <StatEntry name="SPD" value={pokeData.stats.speed} />
            <StatEntry name="HP" value={pokeData.stats.hp} />
            <StatEntry name="HEIGHT" value={pokeData.weight} unit="kg" />
            <StatEntry name="WEIGHT" value={pokeData.height} unit="m" />
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonModal;
