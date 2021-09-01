import "./style.css";

type PokemonCardProps = {
  name: string;
  img: string;
};

const PokemonCard = ({ name, img }: PokemonCardProps): JSX.Element => {
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
