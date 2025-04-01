import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
import CountryList from "@/country-details-v1.json";
import { CountryCard } from "./CountryCard";

import { useNavigate } from "react-router-dom";

export const Vote = () => {
  const navigator = useNavigate();

  return (
    <Grid container className="justify-center text-center">
      <Grid size={11} className="pt-10">
        <Button
          className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2 h-1/3"
          onClick={() => {
            navigator("/user");
          }}
        >
          Go Back
        </Button>
      </Grid>
      {CountryList.map((country) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </Grid>
  );
};
