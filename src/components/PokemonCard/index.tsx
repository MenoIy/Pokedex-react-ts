import "./style.css";

type PokemonCardProps = {
  id: number;
  name: string;
  img: string;
};

const PokemonCard = ({ id, name, img }: PokemonCardProps): JSX.Element => {
  return (
    <section className="pokemon-card">
      <div className="img-container">
        <img src={img} alt={name} />
      </div>
      <div className="card-name">{name}</div>
    </section>
  );
};
export default PokemonCard;
