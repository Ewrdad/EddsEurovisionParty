import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
import CountryList from "@/country-details-v1.json";
import { CountryCard } from "./CountryCard";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export const Vote = () => {
  const navigator = useNavigate();
  const [totalVotes, setTotalVotes] = useState({});

  const votesSum = Object.values(totalVotes).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

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
      <Grid size={11}>
        <div className={votesSum >= 20 ? "bg-amber-400/75" : "bg-white/75"}>
          <h3 className="text-xl">Total Votes: {votesSum}/20</h3>
        </div>
      </Grid>
      {CountryList.map((country) => (
        <CountryCard
          key={country.name}
          country={country}
          setTotalVotes={setTotalVotes}
        />
      ))}
    </Grid>
  );
};
