type Props = {
  id: number;
  name: string;
  img: string;
};

const Pokemon = ({ id, name, img }: Props): JSX.Element => {
  return (
    <section className="pokemon__card">
      <div className="pokemon__img__container">
        <img src={img} alt={name} />
      </div>
      <h4>{name}</h4>
    </section>
  );
};
export default Pokemon;
