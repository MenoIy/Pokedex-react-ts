const pokeUrl = "https://pokeapi.co/api/v2";
const pokeImgUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";

type GetPokeListOptions = {
  limit?: number;
  offset?: number;
};

export const getPokemonsListQuery = (options?: GetPokeListOptions): string => {
  const limit = options?.limit || 20;
  const offset = options?.offset || 0;

  return `${pokeUrl}/pokemon?limit=${limit}&offset=${offset}`;
};

export const getPokemonImgUrl = (id: number): string => {
  return `${pokeImgUrl}/${id}.svg`;
};

export const getPokemonInfoQuery = (id: number): string => {
  return `${pokeUrl}/pokemon/${id}`;
};
