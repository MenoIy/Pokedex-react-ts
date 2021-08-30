import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { getPokemonInfoQuery, getPokemonImgUrl } from "../pokeApi";

type PekemonStats = {
  hp: number;
  atk: number;
  def: number;
  speed: number;
  special_atk: number;
  special_def: number;
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
        special_atk: data.stats[3].base_stat,
        special_def: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
    });
  }, [data, id]);

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
              <span>Height</span>
              <h1>{pokeData.height} m</h1>
            </div>
            <div>
              <span>Weight</span>
              <h1>{pokeData.weight} kg</h1>
            </div>
          </div>
          <span>Types :</span>
          <div className="pokemon__modal__types">
            {pokeData.types.map((type: string, index: number) => (
              <div key={index}>{type}</div>
            ))}
          </div>
          <table className="pokemon__modal__stats">
            <tbody>
              <tr>
                <th>HP</th>
                <td>{pokeData.stats.hp}</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>{pokeData.stats.atk}</td>
              </tr>
              <tr>
                <th>Defense</th>
                <td>{pokeData.stats.def}</td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>{pokeData.stats.speed}</td>
              </tr>
              <tr>
                <th>Special Attack</th>
                <td>{pokeData.stats.special_atk}</td>
              </tr>
              <tr>
                <th>Special Defense</th>
                <td>{pokeData.stats.special_def}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PokemonModal;
