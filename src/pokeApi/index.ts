const pokeUrl = "https://pokeapi.co/api/v2";
const pokeImgUrlDreamWorld: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";
const pokeImgUrlOfficialArtwork: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const DreamWorldLimit: number = 649;

type GetPokeListOptions = {
  offset?: number;
  limit?: number;
};

export const getPokemonsListQuery = (options?: GetPokeListOptions): string => {
  const limit = options?.limit || 20;
  const offset = options?.offset || 0;
  return `${pokeUrl}/pokemon?offset=${offset}&limit=${limit}`;
};

export const getPokemonImgUrl = (id: number): string => {
  if (id <= DreamWorldLimit) return `${pokeImgUrlDreamWorld}/${id}.svg`;
  return `${pokeImgUrlOfficialArtwork}/${id}.png`;
};

export const getPokemonInfoQuery = (id: number): string => {
  return `${pokeUrl}/pokemon/${id}`;
};
