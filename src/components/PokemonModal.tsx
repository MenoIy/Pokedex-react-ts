import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { getPokemonInfoQuery } from "../pokeApi";

type Propse = {
  id: number;
  img: string;
};

type PekemonStats = {
  pv: number;
  att: number;
  def: number;
  speed: number;
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

const PokemonModal = ({ id, img }: Propse): JSX.Element => {
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
      image: img,
      stats: {
        pv: data.stats[0].base_stat,
        att: data.stats[1].base_stat,
        def: data.stats[2].base_stat,
        speed: data.stats[3].base_stat,
      },
    });
  }, [data, img]);

  return (
    <div className="pokemon__modal">
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {pokeData && !loading && (
        <>
          <h1>{pokeData.name}</h1>
          <div className="pokemon__modal__img">
            <img src={pokeData.image} alt={pokeData.name} />
          </div>
          <div className="pokemon__modal__cara">
            <div>
              <h1>Height</h1>
              <h1>{pokeData.height} m</h1>
            </div>
            <div>
              <h1>Weight</h1>
              <h1>{pokeData.weight} kg</h1>
            </div>
          </div>
          <div className="pokemon__modal__types">
            {pokeData.types.map((type: string) => (
              <div>{type}</div>
            ))}
          </div>
          <div className="pokemon__modal__stats">
            <div>
              <span>PV</span>
              <h1>{pokeData.stats.pv}</h1>
            </div>
            <div>
              <span>Attack</span>
              <h1>{pokeData.stats.att}</h1>
            </div>
            <div>
              <span>Defence</span>
              <h1>{pokeData.stats.def}</h1>
            </div>
            <div>
              <span>Speed</span>
              <h1>{pokeData.stats.speed}</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonModal;
