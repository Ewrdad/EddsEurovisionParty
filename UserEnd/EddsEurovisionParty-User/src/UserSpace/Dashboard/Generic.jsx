export const Generic = ({ country }) => {
  return (
    <div className="h-fit mb-4 w-full bg-white/70 text-shadow-lg backdrop-blur-3xl">
      {country.country} : {country.votes} votes
    </div>
  );
};
