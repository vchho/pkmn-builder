const PokemonImage = ({ pokemonName }: { pokemonName: string }) => {
  return (
    <div
      className={`pkm pkm-${pokemonName.toLowerCase()} mx-auto`}
      role="img"
      style={{ transform: "scale(1.25)" }}
    />
  );
};

export default PokemonImage;
