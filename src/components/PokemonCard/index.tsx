import { getPokemonImgUrl } from "../../pokeApi";
import "./style.css";

type PokemonCardProps = {
  id: number;
  name: string;
  onClick: (id: number) => void;
};

const PokemonCard = ({ id, name, onClick }: PokemonCardProps): JSX.Element => {
  const img = getPokemonImgUrl(id);
  return (
    <section className="pokemon-card" onClick={() => onClick(id)}>
      <div className="img-container">
        <img src={img} alt={name} />
      </div>
      <div className="card-name">{name}</div>
    </section>
  );
};
export default PokemonCard;
