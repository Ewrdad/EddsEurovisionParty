export const Generic = ({ country }) => {
  return (
    <div className="h-fit m-2 w-3/4 bg-white/70 text-shadow-lg backdrop-blur-3xl">
      {country.country} : {country.votes} votes
    </div>
  );
};
