import { Grid } from "@mui/material";
import CountryList from "@/country-details-v1.json";

export const Top3Card = ({ country, fakePoints }) => {
  const countryDetails = CountryList.find((c) => c.name == country.country);
  console.log("Country details: ", countryDetails);
  return (
    <Grid size={12} className="h-full p-2">
      <Grid
        container
        className="justify-center text-center h-full w-full bg-white/70 backdrop-blur-3xl"
      >
        <Grid
          size={2}
          className="content-center bg-linear-65  to-purple-600/70 from-indigo-800/50 "
        >
          <h1 className="text-7xl text-white/70">{fakePoints}</h1>
        </Grid>
        <Grid size={4} className="content-center">
          <img
            src={countryDetails.flagUrl}
            alt={country.country}
            className=" h-50 w-full overflow-clip justify-center bg-amber-500 object-cover self-center"
          />
        </Grid>
        <Grid size={6} className="h-full">
          <Grid container className="h-full">
            <Grid size={12} className="pb-4">
              {" "}
              <h1 className="text-4xl text-shadow-lg">{countryDetails.song}</h1>
              <h3 className="text-2xl text-shadow-md">
                {countryDetails.artist}{" "}
              </h3>
            </Grid>
            <Grid size={6}>
              <p>Votes</p>
              <h1 className="text-4xl text-shadow-lg">{country.votes}</h1>
            </Grid>
            <Grid size={6}>
              <p>Wins(All Time)</p>
              <h1 className="text-4xl text-shadow-lg">{countryDetails.wins}</h1>
            </Grid>
            <Grid size={12} className="align-bottom content-end h-full">
              <p className="inline-block p-2">
                {" "}
                Language: {countryDetails.language}
              </p>
              <p className="inline-block p-2">
                Contest Appearances:{"    "}
                {countryDetails.appearances}
              </p>
              <p className="inline-block p-2">
                Hosted: {countryDetails.hosted}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
